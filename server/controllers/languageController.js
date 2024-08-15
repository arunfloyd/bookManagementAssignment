const Language = require("../models/languageModel");
const Book = require("../models/bookModel");
const asyncHandler = require("express-async-handler");

const addLanguage = asyncHandler(async (req, res) => {
  try {
    const { name, code } = req.body;
    const existingLanguage = await Language.findOne({
      $or: [{ name }, { code }],
    });

    if (existingLanguage) {
      return res.status(400).json({
        message:
          existingLanguage.name === name
            ? "Language already exists"
            : "Language code already exists",
      });
    }

    const newLanguage = await Language.create({ name, code });
    res.status(201).json({
      message: "Language added successfully",
      language: newLanguage,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const getAllLanguages = asyncHandler(async (req, res) => {
  try {
    const languages = await Language.find({});
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const getLanguageById = asyncHandler(async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);
    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }
    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const updateLanguage = asyncHandler(async (req, res) => {
  try {
    const { name, code } = req.body;
    const existingLanguage = await Language.findOne({
      $or: [{ name }, { code }],
      _id: { $ne: req.params.id },
    });

    if (existingLanguage) {
      return res.status(400).json({
        message:
          existingLanguage.name === name
            ? "Language name already exists"
            : "Language code already exists",
      });
    }

    const language = await Language.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    res.status(200).json(language);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const deleteLanguage = asyncHandler(async (req, res) => {
  try {
    const language = await Language.findById(req.params.id);

    if (!language) {
      return res.status(404).json({ message: "Language not found" });
    }

    const bookUsingLanguage = await Book.findOne({ language: req.params.id });

    if (bookUsingLanguage) {
      return res.status(400).json({
        message: "Cannot delete language as it is being used by books",
      });
    }

    await language.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Language deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = {
  addLanguage,
  getAllLanguages,
  getLanguageById,
  updateLanguage,
  deleteLanguage,
};
