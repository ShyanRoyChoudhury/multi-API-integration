import fs from "fs";
import { Response } from "express";
import errorHandler from "../utils/errorHandler";
import { ResponseSchema } from "../models/model";

interface payloadInterface {
  prompt: string;
  output_format: string;
}

interface GenerationResponse {
  artifacts: Array<{
    base64: string;
    seed: number;
    finishReason: string;
  }>;
}

async function handleStability(payload: payloadInterface, res: Response) {
  try {
    const response = await fetch(
      `https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: payload.prompt,
            },
          ],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 30,
          samples: 1,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseJSON = (await response.json()) as GenerationResponse;

    const image = responseJSON.artifacts[0].base64;
    await ResponseSchema.create({
      model: 'stableDiffusion',
      prompt: payload.prompt,
      content: image
    })

    return {
      model: 'stableDiffusion',
      content: image
    }
  } catch (e) {
    errorHandler(res, e);
  }
}
export default handleStability;
