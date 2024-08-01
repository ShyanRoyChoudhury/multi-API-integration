import Replicate from "replicate";
import { Response } from "express";

async function handleReplicate(prompt: string, res: Response) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
  console.log(process.env.REPLICATE_API_TOKEN);
  console.log("Running the model...");
  const output = await replicate.run(
    "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
    {
      input: {
        prompt,
      },
    }
  );
  console.log(output);
  res.json({
    imageLink: output,
  });
}

export default handleReplicate;
