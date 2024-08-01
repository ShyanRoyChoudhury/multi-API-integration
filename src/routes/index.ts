import express, { Response } from "express";
import { controller } from "../controllers/controller";

const router = express.Router();

router.post("/prompt", controller);

router.get("/health", (res: Response) => {
  res.status(200).json({ status: "OK", message: "Service is healthy" });
});

export default router;
