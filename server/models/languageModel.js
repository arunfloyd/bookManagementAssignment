const mongoose = require("mongoose");

const languageSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true, 
  },
}, { timestamps: true }); 

module.exports  = mongoose.model('Language', languageSchema);