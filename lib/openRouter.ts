// lib/openRouter.ts
//@ts-ignore
import { OPENROUTER_API_KEY } from '@env';

export async function getReply(message: string, spiciness: number): Promise<string> {
  const mood = ['dry / nonchalant', 'normal / respectful', 'playful', 'flirty', 'bold / seductive'][spiciness];

  const systemPrompt = `
                You are ReplyAI, an assistant that helps users respond to messages in a cool, mature, and human-like tone.
                Keep replies short (1-2 lines), natural, and in the vibe of a real person texting.
                Avoid sounding robotic or cringe. Adjust the tone based on mood:

                Mood guide:
                - 0 = Dry / Nonchalant
                - 1 = Normal / Respectful
                - 2 = Playful
                - 3 = Flirty
                - 4 = Bold / Seductive

                Respond in that mood, and do NOT explain anything. Just the reply, nothing else.
                `;

  const userPrompt = `Mood: ${mood}\nMessage to reply to:\n"${message}"`;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 60,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter error: ${res.status}\n${err}`);
  }

  const data = await res.json();
  return data.choices[0].message.content.trim();
}


// lib/openRouter.ts
export async function getScreenshotReply(rawText: string, mood: number): Promise<string> {
  const systemPrompt = `
        You're ReplyAI, an expert in crafting human-like, concise, and witty replies based on screenshots of text conversations. The user will give you a raw OCR dump from a chat screenshot. Keep replies short (1-2 lines), natural, and in the vibe of a real person texting. Avoid sounding robotic or cringe. Your job is to:
        1. Extract only the **most recent message they received** (ignore timestamps, usernames, and previous replies).
        2. Craft a reply based on the desired mood/spiciness level.

        Mood levels:
        - 0: Chill & dry (disinterested)
        - 1: Nonchalant (neutral/friendly)
        - 2: Natural (normal, balanced)
        - 3: Playful (lightly flirty, teasing)
        - 4: Spicy (bold, confident, flirt-forward)

        Respond with only the message reply — no preambles or explanations.
        Keep it under 25 words unless it adds charm.
        `;

  const moodLabels = ['dry', 'neutral', 'natural', 'playful', 'flirty'];
  const userPrompt = `Here is the OCR'd screenshot text:\n\n${rawText}\n\nGenerate a reply that feels ${moodLabels[mood]} in tone.`;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  const json = await res.json();
  if (!res.ok) throw new Error(`OpenRouter error: ${res.statusText}`);

  return json.choices?.[0]?.message?.content?.trim() || 'Could not generate reply.';
}
