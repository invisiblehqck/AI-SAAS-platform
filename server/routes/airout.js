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
<<<<<<< HEAD

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
=======
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
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de

export default airout;
