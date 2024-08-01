import { Response } from "express";

export default function errorHandler(res: Response, error: any) {
  const statusCode = error.status || 500;
  const message = error.message || "Internal Server Error";

  console.error(error);
  res.status(statusCode).json({
    error: {
      message,
    },
  });
}
