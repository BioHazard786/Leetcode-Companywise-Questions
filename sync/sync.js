import csv from "csv-parser";
import "dotenv/config";
import postgres from "postgres";
import { Readable } from "stream";

const sql = postgres(process.env.DATABASE_URL);

const CSV_FILES = [
  "5. All.csv",
  "4. More Than Six Months.csv",
  "3. Six Months.csv",
  "2. Three Months.csv",
  "1. Thirty Days.csv",
];

async function fetchCompanyFolders() {
  const headers = {};
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await fetch(process.env.GITHUB_API_URL, { headers });
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);

  const data = await response.json();
  const companies = data
    .filter((item) => item.type === "dir")
    .map((item) => item.name);

  return companies;
}

async function fetchCSV(companyName, csvFile) {
  const headers = {};
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const url = `${process.env.GITHUB_RAW_URL}/${encodeURIComponent(
    companyName
  )}/${encodeURIComponent(csvFile)}`;
  const response = await fetch(url, { headers });

  if (!response.ok) return null;

  return await response.text();
}

function parseCSVText(csvText) {
  return new Promise((resolve, reject) => {
    const results = [];
    const stream = Readable.from([csvText]);

    stream
      .pipe(csv())
      .on("data", (data) => {
        const keys = Object.keys(data);
        if (keys.length >= 6) {
          results.push({
            difficulty: data[keys[0]]?.toUpperCase() || "UNKNOWN",
            title: data[keys[1]] || "",
            frequency: parseFloat(data[keys[2]]) || 0,
            acceptanceRate: parseFloat(data[keys[3]]) * 100 || 0,
            link: data[keys[4]] || "",
            topics: data[keys[5]]
              ? data[keys[5]]
                  .split(",")
                  .map((t) => t.trim())
                  .filter((t) => t)
              : [],
          });
        }
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function processCompany(companyName) {
  const allProblems = [];
  const seenTitles = new Set();

  for (const csvFile of CSV_FILES) {
    try {
      const csvText = await fetchCSV(companyName, csvFile);
      if (!csvText) {
        continue;
      }

      const problems = await parseCSVText(csvText);

      for (const problem of problems) {
        if (problem.title && !seenTitles.has(problem.title)) {
          seenTitles.add(problem.title);
          allProblems.push(problem);
        }
      }
    } catch (error) {
      console.log(`Error processing CSV for ${companyName}:`, error.message);
      continue;
    }
  }

  return allProblems;
}

async function saveCompanyData(companyName, problems) {
  if (problems.length === 0) return;

  try {
    await sql.begin(async (sql) => {
      // Insert or get company (keep for reference)
      const [company] = await sql`
        INSERT INTO companies (name) 
        VALUES (${companyName})
        ON CONFLICT (name) DO UPDATE SET updated_at = CURRENT_TIMESTAMP
        RETURNING id, name
      `;

      // Process each problem and update/insert with company data
      const batchSize = 50;
      for (let i = 0; i < problems.length; i += batchSize) {
        const batch = problems.slice(i, i + batchSize);

        for (const problem of batch) {
          // Check if problem exists
          const [existingProblem] = await sql`
            SELECT id, companies 
            FROM problems 
            WHERE title = ${problem.title}
          `;

          const companyData = {
            name: company.name,
            frequency: problem.frequency,
          };

          if (existingProblem) {
            // Update existing problem
            // Parse the JSONB companies data (it comes as string from DB)
            const currentCompanies =
              typeof existingProblem.companies === "string"
                ? JSON.parse(existingProblem.companies)
                : existingProblem.companies || [];

            // Remove existing entry for this company if it exists
            const filteredCompanies = currentCompanies.filter(
              (c) => c.name !== company.name
            );

            // Add the new/updated company data
            const updatedCompanies = [...filteredCompanies, companyData];

            await sql`
              UPDATE problems 
              SET 
                difficulty = ${problem.difficulty},
                acceptance_rate = ${problem.acceptanceRate},
                link = ${problem.link},
                topics = ${problem.topics},
                companies = ${sql.json(updatedCompanies)},
                updated_at = CURRENT_TIMESTAMP
              WHERE title = ${problem.title}
            `;
          } else {
            // Insert new problem
            await sql`
              INSERT INTO problems (
                title, 
                difficulty, 
                acceptance_rate, 
                link, 
                topics, 
                companies
              )
              VALUES (
                ${problem.title},
                ${problem.difficulty},
                ${problem.acceptanceRate},
                ${problem.link},
                ${problem.topics},
                ${sql.json([companyData])}
              )
            `;
          }
        }
      }

      console.log(`✓ Saved ${problems.length} problems for ${companyName}`);
    });
  } catch (error) {
    console.log(`✗ Failed to save data for ${companyName}: ${error.message}`);
    throw error;
  }
}

async function sync() {
  try {
    const companies = await fetchCompanyFolders();

    let processedCount = 0;
    let savedCount = 0;

    for (const company of companies) {
      try {
        const problems = await processCompany(company);

        await saveCompanyData(company, problems);

        if (problems.length > 0) savedCount++;
        processedCount++;
      } catch (error) {
        console.log(`✗ Failed to process ${company}: ${error.message}`);
        processedCount++;
        continue;
      }
    }

    console.log(
      `=== Sync completed: ${processedCount}/${companies.length} companies processed, ${savedCount} saved ===`
    );
    await sql.end();
    process.exit(0);
  } catch (error) {
    await sql.end();
    console.log("Sync failed:", error.message);
    process.exit(1);
  }
}

sync();
