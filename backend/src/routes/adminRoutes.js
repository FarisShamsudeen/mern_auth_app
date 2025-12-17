import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/adminController.js";

import { auth, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/users", auth, adminOnly, getUsers);
router.post("/users", auth, adminOnly, createUser);
router.put("/users/:id", auth, adminOnly, updateUser);
router.delete("/users/:id", auth, adminOnly, deleteUser);

export default router;

