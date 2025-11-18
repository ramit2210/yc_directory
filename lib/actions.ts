"use server";

import { auth } from "@/auth";
import slugify from "slugify";
import { db } from "@/db";
import { startup } from "@/db/schema";

import { parseServerActionResponse } from "@/lib/utils";

export const createPitch = async (
    state: any,
    form: FormData,
    pitch: string
) => {
    const session = await auth();

    if (!session) {
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });
    }

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch")
    );

    // Validate image URL on server-side
    try {
        const res = await fetch(link as string, { method: "HEAD" });
        const contentType = res.headers.get("content-type");

        if (!contentType?.startsWith("image/")) {
            return parseServerActionResponse({
                error: "The provided URL is not a valid image",
                status: "ERROR",
            });
        }
    } catch (error) {
        return parseServerActionResponse({
            error: "Failed to validate image URL",
            status: "ERROR",
        });
    }

    const slug = slugify(title as string, { lower: true, strict: true });

    try {
        const result = await db
            .insert(startup)
            .values({
                title: title as string,
                description: description as string,
                category: category as string,
                image: link as string,
                slug,
                pitch,
                authorId: Number(session.id),
            })
            .returning();

        return parseServerActionResponse({
            ...result[0],
            error: "",
            status: "SUCCESS",
        });
    } catch (error) {
        console.log(error);
        return parseServerActionResponse({
            error: String(error),
            status: "ERROR",
        });
    }
};
