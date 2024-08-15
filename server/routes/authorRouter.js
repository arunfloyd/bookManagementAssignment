const express = require("express");
const {
  addAuthor,
  getAllAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const { authenticateUser } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", getAllAuthor);
router.post("/", addAuthor);
router.delete("/:id", deleteAuthor);
router.get("/:id", getAuthorById);
router.put("/:id", updateAuthor);

module.exports = router;
