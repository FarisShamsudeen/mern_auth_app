import bcrypt from "bcryptjs";
import User from "../models/User.js";

// GET all users (with search)
export const getUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const total = await User.countDocuments(keyword);

  const users = await User.find(keyword)
    .select("-password")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.json({
    users,
    page,
    pages: Math.ceil(total / limit),
    total,
  });
};

// CREATE user
export const createUser = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role,
  });

  res.status(201).json(user);
};

// UPDATE user
export const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update normal fields
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;
  user.role = req.body.role || user.role;

  // 🔑 IMPORTANT PASSWORD LOGIC
  if (req.body.password && req.body.password.trim() !== "") {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
  }
  // else → do NOTHING (keep existing password)

  const updatedUser = await user.save();

  res.json(updatedUser);
};

// DELETE user
export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User removed" });
};
