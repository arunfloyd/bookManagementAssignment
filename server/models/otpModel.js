const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: '0' },
    },
  },
  {
    capped: {
      size: 1024,
      max: 1,
      autoIndexId: true,
    },
  }
);

// Ensure only one document exists
otpSchema.pre('save', async function(next) {
  const OtpModel = this.constructor;
  if (this.isNew) {
    await OtpModel.deleteMany({});
  }
  next();
});

module.exports = mongoose.model("Otp", otpSchema);