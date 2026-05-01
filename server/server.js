import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";

import airout from "./routes/airout.js";
import sql from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

await connectCloudinary();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Server is live!");
});

app.use("/api/ai", requireAuth(), airout);
app.use("/api/user", requireAuth(), userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
