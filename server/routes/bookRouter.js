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
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getAllBook);
router.get("/search", searchBooks);
router.post("/", upload.single("coverImage"),authenticateUser, addBook);
router.delete("/:id",authenticateUser, deleteBook);
router.get("/:id",authenticateUser, getBookById);
router.put("/:id", upload.single("coverImage"),authenticateUser, updateBook);

module.exports = router;
