import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages, model = "gpt-3.5-turbo" } = await req.json();
    
    const result = await streamText({
      model: openai(model),
      messages: convertToCoreMessages(messages),
      system: "You are a helpful AI assistant that provides clear and concise responses",
      temperature: 0.7,
      max_tokens: 2000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
