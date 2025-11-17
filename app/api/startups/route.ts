import { NextResponse } from "next/server";
import { getStartups } from "@/lib/queries";

export async function GET(request: Request) {
    // Read query params from the incoming request URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || undefined;

    const posts = await getStartups(query);
    return NextResponse.json(posts);
}
