CREATE TABLE "author" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"image" text,
	"bio" text,
	CONSTRAINT "author_username_unique" UNIQUE("username"),
	CONSTRAINT "author_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "startup" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"author_id" integer,
	"views" integer DEFAULT 0,
	"description" text,
	"category" varchar(50) NOT NULL,
	"image" text NOT NULL,
	"pitch" text,
	CONSTRAINT "startup_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "startup" ADD CONSTRAINT "startup_author_id_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."author"("id") ON DELETE cascade ON UPDATE no action;