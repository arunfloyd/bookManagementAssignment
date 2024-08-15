const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/generateToken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");


// Admin Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  generateToken(res, user._id);
  res.json({ user });
});

// Admin Logout 

const logout = asyncHandler(async (req, res) => {
  res.cookie("userToken", "", {
    httpOnly: true,
    secure: false, 
    sameSite: "strict",
    maxAge: 0, 
  });

  res.json({ message: "User logged out successfully" });
});

// Admin New Password 


const newPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const user = await User.findOne(); 

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  user.password = hashedPassword;
  await User.findOneAndUpdate({ _id: user._id }, { password: hashedPassword });

  res.json({ message: "Password updated successfully" });
});

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

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
