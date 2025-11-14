import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const file = form.get("file");
    const apiKey = form.get("apiKey");

    // Validation

    // Type guards
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded or file object is invalid" },
        { status: 400 }
      );
    }

    // Validate filetype
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "File must be a PDF" },
        { status: 400 }
      );
    }

    // Convert File to Base64
    const arrayBuffer = await file.arrayBuffer();
    const pdfData = Buffer.from(arrayBuffer).toString("base64");

    // Gemini API request
    const model = "gemini-2.5-flash-preview-09-2025";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${
      apiKey ? apiKey : process.env.GEMINI_API_KEY
    }`;

    const geminiRes = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                inlineData: {
                  mimeType: "application/pdf",
                  data: pdfData,
                },
              },
              {
                text: "Summarize this PDF in a short paragraph",
              },
            ],
          },
        ],
      }),
    });

    if (!geminiRes.ok) {
      const errorDetail = await geminiRes.text();
      console.error("Gemini API Error:", errorDetail);
      throw new Error(
        `Gemini API failed with status ${geminiRes.status}: ${errorDetail}`
      );
    }

    const result: any = await geminiRes.json();

    const summary =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Error: No structured text summary returned by Gemini.";

    return NextResponse.json({ summary });
  } catch (err: any) {
    console.error("API Route Error:", err);
    return NextResponse.json(
      { error: `Server error: ${err.message}` },
      { status: 500 }
    );
  }
}
