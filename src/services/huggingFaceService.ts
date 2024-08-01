import { textGeneration, textGenerationStream } from "@huggingface/inference";
import { Response } from "express";

async function handleHuggingFace(res: Response) {
  await textGeneration({
    model: "gpt2",
    inputs: "The answer to the universe is",
  });

  for await (const output of textGenerationStream({
    accessToken: process.env.HUGGINGFACE_API_KEY,
    model: "google/flan-t5-xxl",
    inputs: 'repeat "one two three four"',
    parameters: { max_new_tokens: 250 },
  })) {
    console.log(output.token.text, output.generated_text);
  }
}

export default handleHuggingFace;
