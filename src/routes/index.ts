import express, { Request, Response } from "express";
import { controllerRouter } from "../controllers/controller";

const router = express.Router();

router.post("/prompt", controllerRouter);

router.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Service is healthy" });
});

export default router;
