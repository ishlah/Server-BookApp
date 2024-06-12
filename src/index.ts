import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { bookRouter } from "./routers/bookrouter";
import { authRouter } from "./routers/authrouter";
import cookieParser from "cookie-parser";

dotenv.config();
mongoose
  .connect(process.env.DB_URL_DEV as string)
  .then(() => console.log("mongodb connect..."))
  .catch((err) => console.log("Error"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors({ origin: "http://127.0.0.1:5173" }));

app.get("/", (req, res) => {
  return res.json({ message: "hello from backend" });
});

app.use("/", bookRouter);
app.use("/auth", authRouter)

app.listen(8000, () => {
  console.log("Port : 8000");
});
