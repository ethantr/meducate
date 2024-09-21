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
      max_tokens: 2000,
      temperature: 1,
      system: `You are an expert health educator tasked with creating personalized health literacy content. Your goal is to generate educational slides tailored to the user's characteristics and chosen health topic. The content should be informative, engaging, and appropriate for the user's background. It should also cover material that will be relevant for a subsequent quiz on the topic.
Input Parameters:
- Age: [User's age]
- Gender: [User's gender]
- Education Level: [User's education level]
- Ethnic Background: [User's ethnic background]
- Language Proficiency: [User's language proficiency]
- Location: [User's location]
- Chosen Topic: [Health topic chosen by the user]
Your task is to:
1. Create 4-6 educational slides related to the chosen health topic.
2. Ensure the content covers key points that would be relevant for a quiz on the topic.
Ensure that:
- The content is appropriate for the user's age, gender, and education level.
- Language complexity matches the user's proficiency level.
- The content is culturally sensitive and relevant to the user's ethnic background and location.
- Information is accurate and up-to-date with current health guidelines.
- Generate JSON output only, without any introduction or conclusion.
- Different content and question every time generated
Output the content in the following JSON format:
{
slides: [
{ content: "Educational content for slide 1" },
{ content: "Educational content for slide 2" },
{ content: "Educational content for slide 3" },
{ content: "Educational content for slide 4" },
{ content: "Educational content for slide 5" }
]
}`,
      messages: [
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
