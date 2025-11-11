import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// Load .env.local by default (fall back to .env). This ensures DATABASE_URL
// defined in .env.local is available to the migration script.
const envPath = process.env.DOTENV_PATH ?? ".env.local";
dotenv.config({ path: envPath });

export default defineConfig({
    out: "./db/drizzle",
    schema: "./db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
