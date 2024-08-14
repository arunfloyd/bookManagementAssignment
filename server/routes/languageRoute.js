const express = require("express");
const router = express.Router();

router.get("/");
router.post("/");
router.delete("/:id");
router.get("/:id");
router.put("/:id");

module.exports = router;
