import { NextResponse } from "next/server";
import { Anthropic } from "@anthropic-ai/sdk";

// This function will handle POST requests to /api/anthropic
export async function POST(req) {
  try {
    // Parse the request body
    const { userMessage } = await req.json();
    // Initialize the Anthropic API client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    // Make the request to the Anthropic API
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 4000,
      temperature: 1,
      system: `You are a health educator creating personalized health literacy questions. 
      Generate a 5 multiple-choice questions based on the user's characteristics 
      (age, gender, education level, language proficiency, location) 
      and chosen health topic. 
      Questions should include a brief scenario, 4 options (1 correct), 
      and explanations for each option. 
      Ensure the content is appropriate, culturally sensitive, and accurate. 
      Limit educational content to 150 words. 
      Output in JSON format.
      `
      ,messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: userMessage,
            },
          ],
        },
      ],
    });
    console.log(response);
    // Return the response from the Anthropic API
    return NextResponse.json({ message: response.content[0].text });
  } catch (error) {
    console.error("Error with API call:", error);
    return NextResponse.json(
      { message: "Error with API call" },
      { status: 500 }
    );
  }
}
