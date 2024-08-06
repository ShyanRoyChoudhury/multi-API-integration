import { Response } from "express";
import axios from "axios";
import { ResponseSchema } from "../models/model";

async function handleDetect(prompt: string, res: Response) {
let data = JSON.stringify({
  "text": "",
  "input_text": prompt
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://api.zerogpt.com/api/detect/detectText',
  headers: { 
    'ApiKey': process.env.ZEROGPT_API_KEY, 
    'Content-Type': 'application/json'
  },
  data : data
};
try {
  const response = await axios.request(config)
  ResponseSchema.create({
    model: 'zeroGPT',
    prompt,
    content: response.data
  })

    return {
      model: 'zeroGPT',
      content: response.data
    }
  } catch (error) {
    throw error
  }
}


export default handleDetect;
