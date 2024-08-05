import express from "express";
import cors from "cors";
import mainRouter from "./routes";
import "./config/config";
import { connectDB } from "./utils/db";
export const app = express();
connectDB();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/", mainRouter);
