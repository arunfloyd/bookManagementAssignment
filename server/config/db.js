const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongo db connected `);
  } catch (error) {
    console.log(`database error ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
