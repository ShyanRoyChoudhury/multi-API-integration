import { Response } from "express";

export default function errorHandler(res: Response, error: any) {
  console.error(error);
  res.status(500).json({
    error: error || "An unexpected error occured",
  });
}
