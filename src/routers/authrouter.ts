import express from "express";
import { authControllers } from "../controllers/authController";
export const authRouter = express();

authRouter.post("/register", authControllers.handleRegister);

authRouter.post("/login", authControllers.handleLogin);
