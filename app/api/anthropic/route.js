// app/api/anthropic/route.js
import { NextResponse } from 'next/server';
import { Anthropic } from '@anthropic-ai/sdk';

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
      model: 'claude-3-opus-20240229',
      max_tokens: 2000,
      temperature: 1,
      system: 'You are a clinician with extremely high health literacy.',
      messages: [{ role: 'user', content: userMessage }],
    });
    console.log(response)
    // Return the response from the Anthropic API
    return NextResponse.json({ message: response.content[0].text });
  } catch (error) {
    console.error('Error with API call:', error);
    return NextResponse.json({ message: 'Error with API call' }, { status: 500 });
  }
}
