import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
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
