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
    parts: [{ text: `You are a health educator creating personalized health literacy questions. 
      Generate a 5 multiple-choice questions based on the user's characteristics 
      (age, gender, education level, language proficiency, location) 
      and chosen health topic. 
      Questions should include a brief scenario, 4 options (1 correct), 
      and explanations for each option. 
      Ensure the content is appropriate, culturally sensitive, and accurate. 
      Limit educational content to 150 words. 
      Output in JSON format.
`}],
  },
});

// Named export for the POST method
export async function POST(req) {
  try {
    const { userMessage } = await req.json();
    const request = {
      contents: [{ role: 'user', parts: [{ text: userMessage || 'How are you doing today?' }] }],
    };

    // Use the generateContentStream method to get the response in chunks
    const result = await generativeModel.generateContent(request);
    const response = result.response;
    console.log('Response: ', response);
    const payload = response.candidates[0].content.parts[0].text;
    const cleanPayload = payload.replace(/```json|```/g, '').trim();
    // Return the full response as JSON
    return NextResponse.json({
      response: JSON.parse(cleanPayload),
    });
  } catch (error) {
    console.error('Error with Gemini API call:', error);
    return NextResponse.json({ error: 'Something went wrong with the generation' }, { status: 500 });
  }
}