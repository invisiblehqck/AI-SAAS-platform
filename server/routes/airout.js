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
  Uploads.single("image"),
  auth,
  removeImageBackground
);
airout.post(
  "/remove-image-object",
  Uploads.single("image"),
  auth,
  removeImageObject
);
airout.post("/resume-review", Uploads.single("image"), auth, resumeReview);

export default airout;
