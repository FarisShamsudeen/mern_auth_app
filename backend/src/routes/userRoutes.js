import express from "express";
import { getProfile, updateProfile } from "../controllers/userController.js";
import { auth } from "../middlewares/authMiddleware.js";
import upload from "../config/cloudinaryMulter.js";

const router = express.Router();

router.get("/me", auth, getProfile);
router.put(
  "/profile",
  auth,
  upload.single("image"),
  updateProfile
);

export default router;

