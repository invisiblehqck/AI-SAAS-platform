import express from "express";
import {
  generateArticle,
  generateBlogTitle,
  generateImage,
  removeImageBackground,
  removeImageObject,
  resumeReview,
} from "../controllers/aiController.js";
import { auth } from "../middlewares/auth.js";
import { Uploads } from "../configs/multer.js";

const airout = express.Router();

airout.post("/generate-article", auth, generateArticle);
airout.post("/generate-blog-title", auth, generateBlogTitle);
airout.post("/generate-image", auth, generateImage);

airout.post(
  "/remove-image-background",
  auth,
  Uploads.single("image"),
  removeImageBackground,
);

airout.post(
  "/remove-image-object",
  auth,
  Uploads.single("image"),
  removeImageObject,
);

airout.post("/resume-review", auth, Uploads.single("resume"), resumeReview);

export default airout;
