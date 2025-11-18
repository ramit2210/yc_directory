import config from "@/lib/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(config.env.databaseUrl, {
    max: 1,
    idle_timeout: 20,
    max_lifetime: 60 * 30,
});
export const db = drizzle(client);
