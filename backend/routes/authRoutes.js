import express from "express";
import { getMe, login, logout, signup } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/sign-up", signup);

authRouter.post("/login", login);

authRouter.post("/logout", logout);

authRouter.get("/get-me", getMe);

export default authRouter;
