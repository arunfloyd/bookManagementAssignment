const express = require("express");
const {
  addBook,
  getAllBook,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
} = require("../controllers/bookController");

const { upload } = require("../middlewares/multerMiddleware");

const router = express.Router();

router.get("/", getAllBook);
router.get("/search", searchBooks);
router.post("/", upload.single("coverImage"), addBook);
router.delete("/:id", deleteBook);
router.get("/:id", getBookById);
router.put("/:id", upload.single("coverImage"), updateBook);

module.exports = router;
