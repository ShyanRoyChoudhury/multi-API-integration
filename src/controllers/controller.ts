import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import handlePrompt from "../services/claudeService";
import handleDetect from "../services/zeroGPTService";
import handleHuggingFace from "../services/huggingFaceService";
import handleReplicate from "../services/replicateService";
import handleStability from "../services/stabilityService";
import { inputSchema } from "../zod";

export async function controllerRouter(req: Request, res: Response) {
  const parsedInput = inputSchema.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(422).json({
      error: parsedInput.error,
    });
    return;
  }
  const { prompt, selectedAPI, output_format } = req.body;
  try {
    switch (selectedAPI) {
      case "replicate":
        await handleReplicate(prompt, res);
        break;
      case "stableDiffusion":
        await handleStability({ prompt, output_format }, res);
        break;
      case "huggingFace":
        await handleHuggingFace(res);
        break;
      case "claude":
        await handlePrompt(prompt, res);
        break;
      case "zeroGPT":
        await handleDetect(prompt, res);
        break;
      default:
        throw new Error("Invalid API Selection");
        break;
    }
  } catch (e) {
    errorHandler(res, e);
  }
}
