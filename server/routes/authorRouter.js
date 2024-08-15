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
router.post("/", authenticateUser,addAuthor);
router.delete("/:id",authenticateUser, deleteAuthor);
router.get("/:id",authenticateUser, getAuthorById);
router.put("/:id",authenticateUser, updateAuthor);

module.exports = router;
