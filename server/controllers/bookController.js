const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");
const { cloudinary } = require("../config/cloudinary");

const addBook = asyncHandler(async (req, res) => {
  try {
    const { name, author, description, price, language, publishedYear } =
      req.body;

    const coverImage = req.file ? req.file.path : null;

    const bookExists = await Book.findOne({ name });
    if (bookExists) {
      return res.status(400).json({ message: "Book already exists" });
    }

    let result;
    try {
      result = await cloudinary.uploader.upload(req.file.path);
    } catch (uploadError) {
      console.error("Error during Cloudinary upload:", uploadError);
      return res.status(500).json({
        message: "Cloudinary upload failed",
        error: uploadError.message,
      });
    }

   

    try {
      const newBook = await Book.create({
        name,
        author,
        description,
        price,
        language,
        publishedYear,
        coverImage: result.secure_url,
      });
      res
        .status(201)
        .json({ message: "Book added successfully", book: newBook });
    } catch (creationError) {
      console.error("Error creating book:", creationError);
      return res.status(500).json({
        message: "Failed to create book",
        error: creationError.message,
      });
    }
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
    const { name, author, description, price, language, publishedYear } = req.body;
    const coverImage = req.file ? req.file.path : null;
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

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

    if (coverImage) {
      let result;
      try {
        result = await cloudinary.uploader.upload(coverImage);
        book.coverImage = result.secure_url; 
      } catch (uploadError) {
        console.error("Error during Cloudinary upload:", uploadError);
        return res.status(500).json({
          message: "Cloudinary upload failed",
          error: uploadError.message,
        });
      }
    }

    book.name = name;
    book.author = author;
    book.description = description;
    book.price = price;
    book.language = language;
    book.publishedYear = publishedYear;

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

    await book.deleteOne({ _id: req.params.id });

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

const searchBooks = asyncHandler(async (req, res) => {
  try {
    const { query, sortField, sortOrder } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const sort = {};
    if (sortField && sortOrder) {
      sort[sortField] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort.price = 1;
    }

    let filter = {};

    if (query) {
      filter = {
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } }
        ]
      };
    }


    let books = await Book.aggregate([
      {
        $lookup: {
          from: 'authors',
          localField: 'author',
          foreignField: '_id',
          as: 'authorData'
        }
      },
      {
        $lookup: {
          from: 'languages',
          localField: 'language',
          foreignField: '_id',
          as: 'languageData'
        }
      },
      {
        $match: query ? {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { 'authorData.name': { $regex: query, $options: "i" } },
            { 'languageData.name': { $regex: query, $options: "i" } }
          ]
        } : {}
      },
      {
        $sort: sort
      },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          publishedYear: 1,
          coverImage: 1,
          author: { $arrayElemAt: ['$authorData', 0] },
          language: { $arrayElemAt: ['$languageData', 0] }
        }
      }
    ]);


    const total = books.length;
    books = books.slice(skip, skip + limit);


    res.json({
      books: books,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBooks: total,
    });
  } catch (error) {
    console.error("Error in searchBooks:", error);
    res.status(500).json({ message: "Server Error", error: error.message, stack: error.stack });
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
