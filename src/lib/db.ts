import * as schema from "@/lib/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

export function getDB() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL or POSTGRES_URL environment variable is required"
    );
  }

  const sql = neon(databaseUrl);
  return drizzle(sql, { schema });
}
