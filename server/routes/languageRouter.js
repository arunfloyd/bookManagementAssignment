const express = require("express");
const {
  addLanguage,
  getAllLanguages,
  getLanguageById,
  updateLanguage,
  deleteLanguage,
} = require("../controllers/languageController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/", getAllLanguages);
router.get("/:id",authenticateUser, getLanguageById);
router.post("/", authenticateUser,addLanguage);
router.put("/:id",authenticateUser, updateLanguage);
router.delete("/:id", authenticateUser,deleteLanguage);

module.exports = router;
