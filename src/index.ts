import express from "express";
import cors from "cors";
import mainRouter from "./routes";
import "./config/config";
export const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/v1/", mainRouter);
