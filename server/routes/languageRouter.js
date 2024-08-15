const express = require("express");
const {
  addLanguage,
  getAllLanguages,
  getLanguageById,
  updateLanguage,
  deleteLanguage,
} = require("../controllers/languageController");

const router = express.Router();
router.get("/", getAllLanguages);
router.get("/:id", getLanguageById);
router.post("/", addLanguage);
router.put("/:id", updateLanguage);
router.delete("/:id", deleteLanguage);

module.exports = router;
