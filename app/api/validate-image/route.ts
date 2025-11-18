import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json(
                { valid: false, error: "URL is required" },
                { status: 400 }
            );
        }

        const res = await fetch(url, { method: "HEAD" });
        const contentType = res.headers.get("content-type");
        const isValid = contentType?.startsWith("image/");

        return NextResponse.json({ valid: isValid });
    } catch (error) {
        return NextResponse.json(
            { valid: false, error: "Failed to validate image" },
            { status: 500 }
        );
    }
}
