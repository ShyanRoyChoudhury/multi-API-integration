import { Response } from "express";

const axios = require("axios");

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
    res.json({ response: response.data });
  } catch (error) {
    console.error(error);
  }
}

export default handleDetect;
