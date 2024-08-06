import Anthropic from "@anthropic-ai/sdk";
import { Response } from "express";
import { ResponseSchema } from "../models/model";

async function handlePrompt(prompt: string, res: Response) {
  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 500,
      temperature: 0,
      system: "",
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
    if (!response || !response.content) {
      throw new Error("Invalid response from API");
    }
    ResponseSchema.create({
      model: 'claude',
      prompt,
      content: response.content
    })
    return { 
      model: 'claude',
      response: response.content
    };
  } catch (error) {
    throw error
  }
}

export default handlePrompt;
