const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: "dbl8uexjf",
  api_key: "679313923612396",
  api_secret: "NDncDQEcGssKS4BCQu0bluoWzAY",
  debug: true,
});

module.exports = {cloudinary};
