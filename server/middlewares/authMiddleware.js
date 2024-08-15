const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const authenticateUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies.userToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;

      // Fetch the user without the password field
      const user = await User.findById(userId).select("-password");

      if (user) {
        req.user = user; // Attach user to the request object
        next(); // Proceed to the next middleware or route handler
      } else {
        res.status(401);
        throw new Error("Unauthorized user: User not found");
      }
    } catch (error) {
      res.status(401).json({ message: "Unauthorized user: Invalid token", error: error.message });
    }
  } else {
    res.status(401).json({ message: "Unauthorized user: No token provided" });
  }
});

module.exports = { authenticateUser };