const express = require("express");
const { sendOtp, verifyOtp } = require("../controllers/otpController");

const router = express.Router();
router.get("/", sendOtp);
router.post("/", verifyOtp);


module.exports = router;
