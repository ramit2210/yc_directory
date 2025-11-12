import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { author } from "./author"; // assuming you already defined the author table
import { relations } from "drizzle-orm";

export const startup = pgTable("startup", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  authorId: integer("author_id").references(() => author.id, {
    onDelete: "cascade",
  }),
  views: integer("views").default(0),
  description: text("description"),
  category: varchar("category", { length: 50 }).notNull(),
  image: text("image").notNull(),
  pitch: text("pitch"),
  _createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const startupRelations = relations(startup, ({ one }) => ({
  author: one(author, {
    fields: [startup.authorId],
    references: [author.id],
  }),
}));
