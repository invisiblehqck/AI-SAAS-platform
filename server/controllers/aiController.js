<<<<<<< HEAD
import { GoogleGenAI } from "@google/genai";
=======
import OpenAI from "openai";
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
<<<<<<< HEAD

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateText = async ({ prompt, maxTokens = 200 }) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      maxOutputTokens: Number(maxTokens) || 200,
      temperature: 0.7,
    },
  });

  return response.text;
};

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        plan: "premium",
      },
    });

=======
import multer from "multer";

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const { userId, has } = req.auth();
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

<<<<<<< HEAD
    const content = await generateText({
      prompt,
      maxTokens: Math.min(Number(length) || 200, 200),
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;
=======
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

<<<<<<< HEAD
    return res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Generate Article Error:", error);

    if (error?.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Gemini free quota exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate article",
=======
    res.json({
      success: true,
      data: content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary"
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`INSERT INTO creations (user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${
      publish ?? false
    })`;

    res.json({
      success: true,
      content: secure_url,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
    });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue.",
      });
    }

<<<<<<< HEAD
    const content = await generateText({
      prompt,
      maxTokens: 100,
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;
=======
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de

    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

<<<<<<< HEAD
    return res.json({
=======
    res.json({
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
      success: true,
      content,
    });
  } catch (error) {
<<<<<<< HEAD
    console.error("Generate Blog Title Error:", error);

    if (error?.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Gemini free quota exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate blog title",
    });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      },
    );

    const base64Image = `data:image/png;base64,${Buffer.from(
      data,
      "binary",
    ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

    return res.json({
      success: true,
      content: secure_url,
    });
  } catch (error) {
    const errorText = error?.response?.data
      ? Buffer.from(error.response.data).toString("utf8")
      : error.message;

    console.error("Generate Image Error:", errorText);

    if (error?.response?.status === 403) {
      return res.status(403).json({
        success: false,
        message:
          "Clipdrop API key is invalid or revoked. Please add a new CLIPDROP_API_KEY in server/.env",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to generate image",
=======
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
    });
  }
};

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
<<<<<<< HEAD
=======
        ,
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

<<<<<<< HEAD
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${"Remove background from image"}, ${secure_url}, 'image')
    `;

    return res.json({
=======
    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId},"Remove background from image," ${secure_url}, 'image')`;

    res.json({
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
      success: true,
      content: secure_url,
    });
  } catch (error) {
<<<<<<< HEAD
    console.error("Remove Background Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to remove background",
=======
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
    });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }
<<<<<<< HEAD

    const { public_id } = await cloudinary.uploader.upload(image.path);

=======
    const { public_id } = await cloudinary.uploader.upload(image.path);
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

<<<<<<< HEAD
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${`Removed ${object} from image`}, ${imageUrl}, 'image')
    `;

    return res.json({
=======
    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId},${`Removed ${object} from image`}," ${imageUrl}, 'image')`;

    res.json({
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
      success: true,
      content: imageUrl,
    });
  } catch (error) {
<<<<<<< HEAD
    console.error("Remove Object Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to remove object",
=======
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
    });
  }
};

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium users.",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "Resume file size exceeds allowed size (5MB) limit.",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdfData = await pdf(dataBuffer);

<<<<<<< HEAD
    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement.

Resume Content:
${pdfData.text}`;

    const content = await generateText({
      prompt,
      maxTokens: 1000,
    });

    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${"Review the uploaded resume"}, ${content}, 'resume-review')
    `;

    return res.json({
=======
    const prompt = `Review the following resume and provide constructive feedback on its strengths and weaknesses and areas for improvement. Resume Content : \n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId},"Review the uploaded resume",${content}, 'resume-review')`;

    res.json({
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
      success: true,
      content,
    });
  } catch (error) {
<<<<<<< HEAD
    console.error("Resume Review Error:", error);

    if (error?.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Gemini free quota exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to review resume",
=======
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
    });
  }
};
