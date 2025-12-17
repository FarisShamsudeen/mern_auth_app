import User from "../models/User.js";

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;

  console.log(user)
  if (req.file) {
    console.log(req)
    user.profileImage = req.file.path; // Cloudinary URL
  }

  const updatedUser = await user.save();

  res.json(updatedUser);
};

