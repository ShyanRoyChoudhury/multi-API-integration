import Anthropic from "@anthropic-ai/sdk";

async function handlePrompt(prompt: string) {
  console.log(process.env.ANTHROPIC_API_KEY);
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const msg = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 500,
    temperature: 0,
    system: "Respond only with short poems.",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
        ],
      },
    ],
  });
  console.log(msg);
  return msg;
}

export default handlePrompt;
