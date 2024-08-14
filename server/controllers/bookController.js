const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");

const addBook = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      author,
      description,
      price,
      language,
      publishedYear,
      coverImage,
    } = req.body;

    // Check if book already exists
    const bookExists = await Book.findOne({ name, author });
    if (bookExists) {
      return res.status(400).json({ message: "Book already exists" });
    }

    const newBook = await Book.create({
      name,
      author,
      description,
      price,
      language,
      publishedYear,
      coverImage,
    });

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const getAllBook = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find({})
      .populate("author", "name")
      .populate("language", "name");
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

const getBookById = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("author", "name")
      .populate("language", "name");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const updateBook = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      author,
      description,
      price,
      language,
      publishedYear,
      coverImage,
    } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if updated name and author combination already exists
    if (name !== book.name || author !== book.author.toString()) {
      const bookExists = await Book.findOne({
        name,
        author,
        _id: { $ne: req.params.id },
      });
      if (bookExists) {
        return res
          .status(400)
          .json({ message: "Book with this name and author already exists" });
      }
    }

    book.name = name;
    book.author = author;
    book.description = description;
    book.price = price;
    book.language = language;
    book.publishedYear = publishedYear;
    book.coverImage = coverImage;

    const updatedBook = await book.save();

    res.json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const deleteBook = asyncHandler(async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.remove();

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const searchBooks = asyncHandler(async (req, res) => {
  try {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    })
      .populate("author", "name")
      .populate("language", "name")
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });

    res.json({
      books,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBooks: total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = {
  addBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
};
