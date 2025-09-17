"use server";

import { getDB } from "@/lib/db";
import { companies, problems } from "@/lib/schema";
import { Company, TableFilters } from "@/lib/types";
import { isValidLeetCodeUrl, normalizeLeetCodeUrl } from "@/lib/utils";
import { and, arrayContains, asc, eq, ilike, or, sql } from "drizzle-orm";

export const getCompanies = async () => {
  try {
    const db = getDB();

    const companiesList = await db
      .select({
        name: companies.name,
      })
      .from(companies)
      .orderBy(asc(companies.name));

    return companiesList;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};

export const getProblems = async (filters: TableFilters = {}) => {
  try {
    const db = getDB();
    const limit = Math.min(filters.limit || 50, 100);
    const cursor = filters.cursor; // cursor will be the title of the last item

    // Build base conditions for the query
    const conditions = [];

    // Cursor-based pagination: get items after the cursor
    if (cursor) {
      conditions.push(sql`${problems.title} > ${cursor}`);
    }

    // Company filtering using JSONB operators
    if (filters.companies && filters.companies.length > 0) {
      const companyConditions = filters.companies.map(
        (company) =>
          sql`${problems.companies} @> ${JSON.stringify([{ name: company }])}`
      );
      conditions.push(or(...companyConditions));
    }

    // Difficulty filtering (multiple difficulties)
    if (filters.difficulty && filters.difficulty.length > 0) {
      const difficultyConditions = filters.difficulty.map((diff) =>
        eq(problems.difficulty, diff)
      );
      conditions.push(or(...difficultyConditions));
    }

    // Title search with ILIKE (keeping trigram for advanced search)
    if (filters.search) {
      // Check if the search input is a valid LeetCode URL
      if (isValidLeetCodeUrl(filters.search)) {
        // If it's a valid URL, search by exact link match
        const normalizedUrl = normalizeLeetCodeUrl(filters.search);
        conditions.push(eq(problems.link, normalizedUrl));
      } else {
        // If it's not a URL, use the original text search logic
        conditions.push(
          or(
            ilike(problems.title, `%${filters.search}%`),
            sql`similarity(${problems.title}, ${filters.search}) > 0.3`
          )
        );
      }
    }

    // Topics filtering using array contains (AND logic - problems must have ALL selected topics)
    if (filters.topics && filters.topics.length > 0) {
      const topicConditions = filters.topics.map((topic) =>
        arrayContains(problems.topics, [topic])
      );
      conditions.push(and(...topicConditions));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get paginated results with one extra item to check if there's a next page
    const result = await db
      .select({
        id: problems.id,
        problem_title: problems.title,
        difficulty: problems.difficulty,
        acceptance_rate: problems.acceptanceRate,
        link: problems.link,
        topics: problems.topics,
        companies: problems.companies,
      })
      .from(problems)
      .where(whereClause)
      .orderBy(asc(problems.title))
      .limit(limit + 1); // Get one extra to check if there's more

    // Check if there are more items
    const hasNextPage = result.length > limit;
    const data = hasNextPage ? result.slice(0, limit) : result;

    // Get the next cursor (title of the last item)
    const nextCursor =
      data.length > 0 ? data[data.length - 1].problem_title : null;

    // Type-safe transformation of the results
    const formattedData = data.map((problem) => ({
      id: problem.id,
      problem_title: problem.problem_title,
      difficulty: problem.difficulty,
      acceptance_rate: problem.acceptance_rate,
      link: problem.link,
      topics: problem.topics || [],
      companies: (problem.companies as Company[]) || [],
    }));

    return {
      data: formattedData,
      nextCursor: hasNextPage ? nextCursor : null,
      hasNextPage,
    };
  } catch (error) {
    console.error("Error fetching problems:", error);
    throw new Error(error instanceof Error ? error.message : "Unknown error");
  }
};
