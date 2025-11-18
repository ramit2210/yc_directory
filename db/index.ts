import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error("DATABASE_URL is missing from environment variables");
    throw new Error(
        "DATABASE_URL is not defined. Please check your environment variables."
    );
}

console.log("Connecting to database...");

const client = postgres(databaseUrl, {
    max: 1,
    idle_timeout: 20,
    max_lifetime: 60 * 30,
});

export const db = drizzle(client);
