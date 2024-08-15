const asyncHandler = require("express-async-handler");
const Otp = require("../models/otpModel");
const User = require("../models/userModel");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const sendOtp = asyncHandler(async (req, res) => {
  try {
    const getEmail = await User.findOne();
    const emailId = getEmail.email;
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const salt = await bcrypt.genSalt(10);
    const encryptedOtp = await bcrypt.hash(otp, salt);

    const otps = new Otp({
      otp: encryptedOtp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), 
      user: emailId,
    });

    const savedOtp = await otps.save();

    const resetURL = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2 style="color: #007BFF;">Verify Your Email</h2>
            <p>Hi, To authenticate, please use the following One Time Password (OTP)</p>
            <div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px; margin-bottom: 20px;">
              <h3 style="margin: 0; color: #007BFF;">${otp}</h3>
            </div>
            <p>Don't share this OTP with anyone. Our customer service team will never ask you for your password, OTP, credit card, or banking info.</p>
            <p>If you did not request this verification, please ignore this email.</p>
            <p>We hope to see you again soon.</p>
            <p style="color: #007BFF;">From Fusion Furni</p>
          </div>`;

    const email = {
      to: emailId,
      text: "Hey User",
      subject: "OTP Verification",
      html: resetURL,
    };

    await sendEmail(email);

    setTimeout(async () => {
      try {
        await Otp.findByIdAndDelete(savedOtp._id);
      } catch (deleteError) {
        console.error("Error deleting OTP:", deleteError);
      }
    }, 5 * 60 * 1000);

    return res.status(200).json("newUser").end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
});
const sendMail = async (transporter, email) => {
  await transporter.sendMail({
    from: '"Fusion Furni 👻" <foo@example.com>',
    to: email.to,
    subject: email.subject,
    text: email.text,
    html: email.html,
  });
};

const sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  await sendMail(transporter, email);
};

const verifyOtp = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  try {
    if (!otp) {
      return res.status(400).send("Invalid OTP");
    }

    const storedOtp = await Otp.findOne().sort({ createdAt: -1 });

    if (!storedOtp) {
      return res.status(400).json({ message: "OTP not found or expired" });
    }

    const isMatch = await bcrypt.compare(otp, storedOtp.otp);

    if (isMatch) {
      return res.status(200).json({ message: "Success" });
    } else {
      return res.status(400).json({ message: "Entered OTP is Wrong" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.sendStatus(400);
  }
});


module.exports = { sendOtp, verifyOtp };
