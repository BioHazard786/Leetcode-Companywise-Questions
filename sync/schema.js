import "dotenv/config";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL);

async function createSchema() {
  try {
    // Create companies table (normalized for referential integrity)
    await sql`
      CREATE TABLE companies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Optimized problems table with JSONB for companies data
    await sql`
      CREATE TABLE problems (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) UNIQUE NOT NULL,
        difficulty VARCHAR(20) NOT NULL,
        acceptance_rate DECIMAL(5,2) DEFAULT 0,
        link TEXT,
        topics TEXT[],
        companies JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create optimized indexes for maximum query performance

    // Enable trigram extension for fuzzy text search FIRST
    await sql`CREATE EXTENSION IF NOT EXISTS pg_trgm`;

    // Basic indexes
    await sql`CREATE INDEX idx_problems_difficulty ON problems(difficulty)`;
    await sql`CREATE INDEX idx_problems_title_search ON problems USING gin(to_tsvector('english', title))`;

    // Advanced JSONB indexes for companies filtering
    await sql`CREATE INDEX idx_problems_companies_gin ON problems USING gin(companies)`;

    // Topics array index
    await sql`CREATE INDEX idx_problems_topics ON problems USING gin(topics)`;

    // Composite indexes for common query patterns
    await sql`CREATE INDEX idx_problems_difficulty_title ON problems(difficulty, title)`;
    await sql`CREATE INDEX idx_problems_title_trigram ON problems USING gin(title gin_trgm_ops)`;

    // Companies table indexes
    await sql`CREATE INDEX idx_companies_name ON companies(name)`;

    console.log("Optimized database schema created successfully");
    console.log("Schema features:");
    console.log("- JSONB companies data for fast filtering");
    console.log("- GIN indexes for array and JSONB operations");
    console.log("- Trigram indexes for fuzzy text search");
    console.log("- Simplified structure without max_frequency");

    process.exit(0);
  } catch (error) {
    console.error("Schema creation failed:", error.message);
    process.exit(1);
  }
}

createSchema();
