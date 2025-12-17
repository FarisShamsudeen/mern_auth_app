import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";


console.log("I have came to cloudinaryMulter.js and this is the cloudinary imported - ", cloudinary)
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mern-auth-app",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage });

export default upload;

