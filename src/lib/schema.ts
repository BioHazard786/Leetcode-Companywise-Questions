import { sql } from "drizzle-orm";
import {
  decimal,
  index,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const companies = pgTable(
  "companies",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [index("idx_companies_name").on(table.name)]
);

export const problems = pgTable(
  "problems",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 500 }).notNull().unique(),
    difficulty: varchar("difficulty", { length: 20 }).notNull(),
    acceptanceRate: decimal("acceptance_rate", {
      precision: 5,
      scale: 2,
    }).default("0"),
    link: text("link"),
    topics: text("topics").array(),
    companies: jsonb("companies").notNull().default("[]"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    // Basic indexes
    index("idx_problems_difficulty").on(table.difficulty),

    // Full-text search index for title
    index("idx_problems_title_search").using(
      "gin",
      sql`to_tsvector('english', ${table.title})`
    ),

    // JSONB index for companies filtering
    index("idx_problems_companies_gin").using("gin", table.companies),

    // Topics array index
    index("idx_problems_topics").using("gin", table.topics),

    // Composite indexes for common query patterns
    index("idx_problems_difficulty_title").on(table.difficulty, table.title),

    // Trigram index for fuzzy text search (requires pg_trgm extension)
    index("idx_problems_title_trigram").using(
      "gin",
      sql`${table.title} gin_trgm_ops`
    ),
  ]
);
