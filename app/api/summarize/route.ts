import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return Response.json({ error: 'No text provided' }, { status: 400 });
    }

    const { text: summary } = await generateText({
      model: google('gemini-1.5-flash'),
      system: 'You are an expert legal assistant. Summarize the following contract clearly, highlighting key obligations, risks, and potential pitfalls for the user.',
      prompt: text,
    });

    return Response.json({ summary });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}
