import { NextResponse } from "next/server";

export default function POST(req: Request) {
    try {

    } catch (error) {
        console.error("Error generate image:", error);
        return NextResponse.json(
            {
                error: "Failed to generate image",
            },
            { status: 500 }
        );
    }
}
