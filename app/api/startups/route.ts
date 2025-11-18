import { NextResponse } from "next/server";
import { getStartups } from "@/lib/queries";

export async function GET(request: Request) {
    try {
        // Read query params from the incoming request URL
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query") || undefined;

        const posts = await getStartups(query);
        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching startups:", error);
        return NextResponse.json(
            { error: "Failed to fetch startups" },
            { status: 500 }
        );
    }
}
