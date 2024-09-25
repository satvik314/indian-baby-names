import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { preferences, previousNames = [], feedback = '' } = await req.json();

    const previousNamesString = previousNames.map((n: { name: string }) => n.name).join(', ');

    const prompt = `Generate 5 unique Indian baby names based on the following preferences:
    Gender: ${preferences.gender}
    Starting Letter (if any): ${preferences.startingLetter}
    Mother Tongue: ${preferences.motherTongue}
    Father's Name: ${preferences.fatherName}
    Mother's Name: ${preferences.motherName}
    Desired Meaning (if any): ${preferences.desiredMeaning}

    Previously generated names (do not repeat these): ${previousNamesString}

    User feedback: ${feedback}

    Please take into account the user's feedback when generating new names.

    Please provide the names in the following format:
    1. [Name] - [Meaning]
    2. [Name] - [Meaning]
    ...`;

    const { text } = await generateText({
      model: anthropic('claude-3-sonnet-20240229'),
      prompt: prompt,
    });

    const nameRegex = /\d+\.\s+(.+)\s+-\s+(.+)/;
    const names = text.split('\n')
      .filter(line => line.trim() !== '')
      .map(line => {
        const match = line.match(nameRegex);
        if (match) {
          return {
            name: match[1].trim(),
            meaning: match[2].trim()
          };
        }
        return null;
      })
      .filter((name): name is { name: string; meaning: string } => name !== null);

    return NextResponse.json({ names });
  } catch (error) {
    console.error('Error generating names:', error);
    return NextResponse.json({ error: 'Failed to generate names' }, { status: 500 });
  }
}