const express = require("express");
const {
  addBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks
} = require("../controllers/bookController");
const router = express.Router();

router.get("/", getAllBook);
router.post("/", addBook);
router.delete("/:id", deleteBook);
router.get("/:id", getBookById);
router.put("/:id", updateBook);

module.exports = router;
