import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

export default async function POST(req: Request) {
    try {
        const payload = {
            prompt: "Lighthouse on a cliff overlooking the ocean",
            output_format: "png"
        };
        
        const response = await axios.postForm(
            `https://api.stability.ai/v2beta/stable-image/generate/core`,
            axios.toFormData(payload, new FormData()),
            {
                validateStatus: undefined,
                responseType: "arraybuffer",
                headers: { 
                    Authorization: `Bearer ${process.env.STABILITY_API_KEY}`, 
                    Accept: "image/*" 
                },
            },
        );

        if (response.status !== 200) {
            throw new Error(`API error: ${response.status}`);
        }

        console.log(response.data);
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
