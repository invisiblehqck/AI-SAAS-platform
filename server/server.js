<<<<<<< HEAD
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { clerkMiddleware, requireAuth } from "@clerk/express";

=======
import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from "@clerk/express";
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
import airout from "./routes/airout.js";
import sql from "./configs/db.js";
import connectCloudinary from "./configs/cloudinary.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

await connectCloudinary();

<<<<<<< HEAD
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

=======
app.use(cors());
app.use(express.json());
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Server is live!");
});

<<<<<<< HEAD
app.use("/api/ai", requireAuth(), airout);
app.use("/api/user", requireAuth(), userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
=======
app.use(requireAuth());

app.use("/api/ai", airout);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
});
