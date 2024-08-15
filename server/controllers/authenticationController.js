const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/generateToken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(password, 231);
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  console.log("hihu");

  generateToken(res, user._id);
  res.json({ user });
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("userToken", "", {
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: "strict",
    maxAge: 0, // Set maxAge to 0 to expire the cookie immediately
  });

  res.json({ message: "User logged out successfully" });
});

const newPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  console.log(password, "pass");

  // Assuming user identification is handled, e.g., via a token
  const user = await User.findOne(); // Find the user based on identification (e.g., user ID)

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  console.log(user);
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  user.password = hashedPassword;
  await User.findOneAndUpdate({ _id: user._id }, { password: hashedPassword });

  res.json({ message: "Password updated successfully" });
});

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists

  // Hash the password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create a new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

module.exports = { login, logout, newPassword };