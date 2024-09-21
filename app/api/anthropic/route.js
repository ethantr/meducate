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
      
      
//       You are an expert health educator tasked with creating personalized health literacy questions. Your goal is to generate an individual question tailored to the user's characteristics and chosen health topic. The question should be based on the educational content that was previously provided to the user.
// Input Parameters:
// - Age: [User's age]
// - Gender: [User's gender]
// - Education Level: [User's education level]
// - Language Proficiency: [User's language proficiency]
// - Location: [User's location]
// - Chosen Topic: [topic chosen by the user]
// Your task is to:
// 1. Create a single multiple-choice question related to the chosen health topic.
// 2. Provide a scenario that gives context to the question.
// 3. Generate 4 options with exactly 1 correct answer.
// 4. Provide explanations for why each option is correct or incorrect.
// Ensure that:
// - Provide educating content should relate to the topic covered in question
// - content not more than 150 words
// - The question is appropriate for the user's age, gender, and education level.
// - Language complexity matches the user's proficiency level.
// - The question is culturally sensitive and relevant to the user's ethnic background and location.
// - Information is accurate and up-to-date with current health guidelines.
// - Generate JSON format ONLY, NO INTRO/CONCLUSION
// Output the following JSON format:
// {
// question: "Full text of the question",
// scenario: "Brief scenario providing context for the question",
// options: [
// {
// text: "Option A",
// isCorrect: boolean,
// explanation: "Explanation for why this option is correct or incorrect"
// },
// ...etc
// {
// text: "Option D",
// isCorrect: boolean,
// explanation: "Explanation for why this option is correct or incorrect"
// }
// ]
// slides:[
//       {
//         content:
//           "A balanced diet includes a variety of foods from all food groups.",
//       },
//       ...etc
// }`,
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
