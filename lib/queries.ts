import { db } from "@/db";
import { startup } from "@/db/schema/startup";
import { author } from "@/db/schema/author";
import { eq, or, ilike, desc, sql } from "drizzle-orm";
export async function getStartups(search?: string) {
    const hasSearch = search && search.trim() !== "";

    const query = db
        .select({
            id: startup.id,
            title: startup.title,
            slug: startup.slug,
            description: startup.description,
            category: startup.category,
            views: startup.views,
            pitch: startup.pitch,
            image: startup.image,
            _createdAt: sql<string>`${startup._createdAt}::text`,
            author: {
                id: author.id,
                name: author.name,
                username: author.username,
                image: author.image,
                bio: author.bio,
            },
        })
        .from(startup)
        .leftJoin(author, eq(startup.authorId, author.id))
        .orderBy(desc(startup._createdAt));

    if (hasSearch) {
        const filtered = query.where(
            or(
                ilike(startup.title, `%${search}%`),
                ilike(startup.category, `%${search}%`),
                ilike(author.name, `%${search}%`)
            )
        );
        return await filtered;
    }

    // console.log(query);

    return await query;
}

export async function getStartupById(id: number) {
    const result = await db
        .select({
            id: startup.id,
            title: startup.title,
            slug: startup.slug,
            _createdAt: startup._createdAt,
            views: startup.views,
            description: startup.description,
            category: startup.category,
            image: startup.image,
            pitch: startup.pitch,
            author: {
                id: author.id,
                name: author.name,
                username: author.username,
                image: author.image,
                bio: author.bio,
            },
        })
        .from(startup)
        .leftJoin(author, eq(startup.authorId, author.id))
        .where(eq(startup.id, id))
        .limit(1);

    return result[0];
}

export async function getStartupViews(id: number) {
    const result = await db
        .select({
            id: startup.id,
            views: startup.views,
        })
        .from(startup)
        .where(eq(startup.id, id))
        .limit(1);

    return result[0];
}

export async function incrementViews(id: number) {
    await db
        .update(startup)
        .set({ views: sql`${startup.views} + 1` })
        .where(eq(startup.id, id));
}
