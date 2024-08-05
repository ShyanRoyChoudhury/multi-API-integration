import Replicate from "replicate";
import { Response } from "express";
import errorHandler from "../utils/errorHandler";
import { ResponseSchema } from "../models/model";

async function handleReplicate(prompt: string, res: Response) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });
  console.log("Running the model...");
  try{
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt,
        },
      }
    );
    return {
      model: 'replicate',
      content: output,
    };
  }catch(e){
    errorHandler(res, e)
  }
}

export default handleReplicate;
