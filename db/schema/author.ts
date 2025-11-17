import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const author = pgTable("author", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    username: varchar("username", { length: 255 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    image: text("image"),
    bio: text("bio"),
    _createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type AuthorType = typeof author.$inferSelect;
export type NewAuthorType = typeof author.$inferInsert;
