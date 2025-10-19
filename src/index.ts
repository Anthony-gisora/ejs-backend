import express, { type Express, type Request, type Response } from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

import { SignInReqInterface } from "./constants/interfaces";

// configurations
dotenv.config();

// initializations
const PORT = process.env.PORT;
const app: Express = express();

// setting ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middlewares
app.use(express.json());
app.use(cors());

// main get API
app.post("/", async (req: Request, res: Response) => {
  const { title, name }: SignInReqInterface = await req.body;

  const data: SignInReqInterface = {
    name,
    title,
  };

  res.status(200).render("index", { name, title });
});

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});
