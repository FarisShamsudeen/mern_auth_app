import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json())
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://YOUR_FRONTEND_URL.netlify.app"
  ],
  credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoutes)

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on the port : ${process.env.PORT || 3000}`)
})
