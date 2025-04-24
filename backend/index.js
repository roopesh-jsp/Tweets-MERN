import express from "express";
import { connectDb } from "./lib/connectDb.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

//middleawres
app.use(express.json());
dotenv.config();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL (Vite runs on 5173)
    credentials: true, // allow cookies to be sent
  })
);

//routes
app.use("/auth", authRouter);

//connect DB and start server
const startServer = async () => {
  try {
    await connectDb();
    app.listen(3000, () => {
      console.log(`Server listening on port ${3000}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  }
};

startServer();
