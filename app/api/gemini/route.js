import { NextResponse } from 'next/server';
const { VertexAI, HarmCategory, HarmBlockThreshold } = require('@google-cloud/vertexai');

const project = 'anuhackathon2024';
const location = 'australia-southeast1';
const textModel = 'gemini-1.5-flash-001';

const vertexAiOptions = {
  project: project,
  location: location,
};
const vertexAI = new VertexAI(vertexAiOptions);
// Instantiate the Gemini model
const generativeModel = vertexAI.getGenerativeModel({
  model: textModel,
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
  generationConfig: { maxOutputTokens: 8192 },
  systemInstruction: {
    role: 'system',
    parts: [{ text: `You are an expert health educator tasked with creating personalized health literacy questions. Your goal is to generate an individual question tailored to the user's characteristics and chosen health topic. The question should be based on the educational content that was previously provided to the user.

Input Parameters:
- Age: [User's age]
- Gender: [User's gender]
- Education Level: [User's education level]
- Language Proficiency: [User's language proficiency]
- Location: [User's location]
- Chosen Topic: [Health topic chosen by the user]

Your task is to:
1. Create a single multiple-choice question related to the chosen health topic.
2. Provide a scenario that gives context to the question.
3. Generate 4 options with exactly 1 correct answer.
4. Provide explanations for why each option is correct or incorrect.

Ensure that:
- Provide educating content should relate to the topic covered in question
- content not more than 150 words
- The question is appropriate for the user's age, gender, and education level.
- Language complexity matches the user's proficiency level.
- The question is culturally sensitive and relevant to the user's ethnic background and location.
- Information is accurate and up-to-date with current health guidelines.


Output the question in the following JSON format:
{
  question: "Full text of the question",
  scenario: "Brief scenario providing context for the question",
  options: [
    {
      text: "Option A",
      isCorrect: boolean,
      explanation: "Explanation for why this option is correct or incorrect"
    },
    {
      text: "Option B",
      isCorrect: boolean,
      explanation: "Explanation for why this option is correct or incorrect"
    },
    {
      text: "Option C",
      isCorrect: boolean,
      explanation: "Explanation for why this option is correct or incorrect"
    },
    {
      text: "Option D",
      isCorrect: boolean,
      explanation: "Explanation for why this option is correct or incorrect"
    }
  ]
}

` }],
  },
});

// Named export for the POST method
export async function POST(req) {
  try {
    // Parse the request body to get the prompt
    const { prompt } = await req.json();

    // Create the request for the Gemini model
    const request = {
      contents: [{ role: 'user', parts: [{ text: prompt || 'How are you doing today?' }] }],
    };

    // Use the generateContentStream method to get the response in chunks
    const result = await generativeModel.generateContent(request);
    const response = result.response;
    console.log('Response: ', response);

    // Return the full response as JSON
    return NextResponse.json({
      response: response,
    });
  } catch (error) {
    console.error('Error with Gemini API call:', error);
    return NextResponse.json({ error: 'Something went wrong with the generation' }, { status: 500 });
  }
}