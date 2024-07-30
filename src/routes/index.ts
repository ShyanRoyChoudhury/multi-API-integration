import express, { Response } from "express";

const router = express.Router();

router.get("/health", (req, res: Response) => {
  res.status(200).json({ status: "OK", message: "Service is healthy" });
});

export default router;
