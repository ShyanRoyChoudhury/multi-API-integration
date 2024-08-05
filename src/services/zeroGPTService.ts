import { Response } from "express";
import errorHandler from "../utils/errorHandler";
import axios from "axios";
import { ResponseSchema } from "../models/model";

// async function handleDetect(prompt: string, res: Response) {
// let data = JSON.stringify({
//   "text": "",
//   "input_text": "Weather: The sky was a brilliant shade of blue, and a gentle breeze carried the scent of blooming flowers through the air.Technology: Advancements in artificial intelligence are rapidly transforming industries, making tasks more efficient and enhancing human capabilities.Travel: Exploring the narrow, cobblestone streets of the ancient city was like stepping back in time to a world filled with history and charm. Food: The rich aroma of freshly baked bread filled the kitchen, promising a delicious breakfast to start the day. Nature: The towering mountains stood majestically against the horizon, their peaks dusted with snow glistening in the morning sun."
// });

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'https://api.zerogpt.com/api/detect/detectText',
//   headers: { 
//     'ApiKey': process.env.ZEROGPT_API_KEY, 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };
// try {
//   const response = await axios.request(config)
//     return {
//       model: 'zeroGPT',
//       content: response.data
//     }
//   } catch (error) {
//     console.error(error);
//     errorHandler(res, error)
//   }
// }
async function handleDetect(prompt: string, res: Response) {
  const options = {
    method: "POST",
    url: "https://zerogpt.p.rapidapi.com/api/v1/detectText",
    headers: {
      "x-rapidapi-key": process.env.ZEROGPT_API_KEY,
      "x-rapidapi-host": "zerogpt.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      input_text: prompt,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    await ResponseSchema.create({
      model: 'zeroGPT',
      prompt,
      content: response.data
    })
    

    return {
      model: 'zeroGPT',
      content: response.data
    }
  } catch (error) {
    console.error(error);
    errorHandler(res, error)
  }
}

export default handleDetect;
