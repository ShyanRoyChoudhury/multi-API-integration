
import { Response } from "express";

import { HfInference } from '@huggingface/inference'

const hf = new HfInference('your access token')


async function handleHuggingFace(res: Response) {
  try {
    //   const response = await query({inputs:"The answer to the universe is "})
    //   console.log(JSON.stringify(response));


    throw new Error('Error with huggingFace API')
    const inference = new HfInference(process.env.HUGGINGFACE_API_KEY)

    await hf.textGeneration({
        model: 'gpt2',
        inputs: 'The answer to the universe is'
      })
      
      for await (const output of hf.textGenerationStream({
        model: "google/flan-t5-xxl",
        inputs: 'repeat "one two three four"',
        parameters: { max_new_tokens: 250 }
      })) {
        console.log(output.token.text, output.generated_text);
      }

    //   return {
    //       model: 'huggingFace',
    //       response
    //   };
  } catch (error) {
      throw error;
  }
}

export default handleHuggingFace;