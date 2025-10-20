import express, {
  json,
  type Express,
  type Request,
  type Response,
} from "express";
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
app.use(express.urlencoded({ extended: true }));

// main get API
app.get("/", async (req: Request, res: Response) => {
  res.status(200).render("index");
});

app.post("/", (req: Request, res: Response) => {
  try {
    const { email, pass }: SignInReqInterface = req.body;

    if (!email || !pass) {
      res.status(404).send("Email and Password are required fields....");
    }

    if (email === "user@gmail.com" && pass === "1234") {
      res.render("home");
    } else {
      res.status(401).send("Invalid email or password....");
    }
  } catch (error) {
    console.log("An error occurred in home Get: ", error);
    res.status(500).render("404");
  }
});

app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`);
});
