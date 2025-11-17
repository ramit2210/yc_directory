import config from "@/lib/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(config.env.databaseUrl);
export const db = drizzle(client);
