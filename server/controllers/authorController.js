const asyncHandler = require("express-async-handler");
const Author = require("../models/authorModel");
const Book = require("../models/bookModel");


// Add Author name
const addAuthor = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    const authorExists = await Author.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
    });

    if (authorExists) {
      return res.status(400).json({ message: "Author already exists" });
    }

    const newAuthor = await Author.create({ name });
    res
      .status(201)
      .json({ message: "Author added successfully", author: newAuthor });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get All Author 
const getAllAuthor = asyncHandler(async (req, res) => {
  try {
    const authors = await Author.find({});
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});


// Get A Author 
const getAuthorById = asyncHandler(async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Update Author 
const updateAuthor = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    const existingAuthor = await Author.findOne({
      name: { $regex: new RegExp("^" + name + "$", "i") },
      _id: { $ne: req.params.id },
    });

    if (existingAuthor) {
      return res.status(400).json({ message: "Author name already exists" });
    }

    const author = await Author.findByIdAndUpdate(
      req.params.id,
      { name },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Delete Author 
const deleteAuthor = asyncHandler(async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    const booksByAuthor = await Book.findOne({ author: req.params.id });

    if (booksByAuthor) {
      return res
        .status(400)
        .json({ message: "Cannot delete author as they have associated books" });
    }

    await author.deleteOne({ _id: req.params.id });
    res.json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = {
  addAuthor,
  getAllAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
