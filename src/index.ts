import express from "express";
import cors from "cors";
import mainRouter from "./routes";
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/v1/", mainRouter);

app.listen(port, () => {
  console.log(`Server runing on port ${port}`);
});
