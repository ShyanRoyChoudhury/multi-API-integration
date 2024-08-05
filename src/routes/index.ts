import express, { Request, Response } from "express";
import { controllerRouter } from "../controllers/controller";
import { ResponseSchema } from "../models/model";
import errorHandler from "../utils/errorHandler";

const router = express.Router();

router.post("/prompt", controllerRouter);

router.get('/prompt', async (_req: Request, res: Response)=>{
  try{
    const prompts = await ResponseSchema.find({}).select("prompt")
    res.json({prompts})
  }catch(e){
    errorHandler(res, e)
  }
})

router.get('/prompt/:id', async (req: Request, res: Response)=>{
  try{
    const { id } = req.params;
    const prompt = await ResponseSchema.findById({
      _id: id
    })
    res.json({
      data:prompt,
      status: "Success"
    })
  }catch(e){
    errorHandler(res, e)
  }
})

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Service is healthy" });
});

export default router;
