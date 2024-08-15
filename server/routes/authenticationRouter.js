const express = require("express");
const { login, logout, newPassword } = require("../controllers/authenticationController");
const router = express.Router();

router.post("/", login);
router.post("/logout", logout);
router.post("/newPassword", newPassword);
module.exports = router;
