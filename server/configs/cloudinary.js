import { v2 as cloudinary } from "cloudinary";

<<<<<<< HEAD
const connectCloudinary = () => {
=======
const connectCloudinary = async () => {
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
<<<<<<< HEAD

  console.log("Cloudinary connected");
=======
>>>>>>> 6316eab6093acb8b4ff44c1ebf38d1c0c4f0b1de
};

export default connectCloudinary;
