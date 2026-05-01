import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  getUserCreations,
  getPublicCreations,
  toggleLikeCreation,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/get-user-creations", auth, getUserCreations);
userRouter.get("/get-public-creations", getPublicCreations);
userRouter.post("/toggle-like-creation", auth, toggleLikeCreation);

export default userRouter;
