import fs from "fs";
import { Response } from "express";
import errorHandler from "../utils/errorHandler";

interface payloadInterface {
  prompt: string;
  output_format: string;
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

    interface GenerationResponse {
      artifacts: Array<{
        base64: string;
        seed: number;
        finishReason: string;
      }>;
    }

    const responseJSON = (await response.json()) as GenerationResponse;

    responseJSON.artifacts.forEach((image, index) => {
      fs.writeFileSync(
        `.v1_txt2img_${index}.png`,
        Buffer.from(image.base64, "base64")
      );
    });
    res.json({ result: "Image Successfully generated" });
  } catch (e) {
    errorHandler(res, e);
  }
}
export default handleStability;
