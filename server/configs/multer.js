import multer from "multer";

const storage = multer.diskStorage({});

export const Uploads = multer({ storage });
