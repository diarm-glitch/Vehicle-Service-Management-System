const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getContactMessages,
  createContactMessage,
  updateContactMessage,
  deleteContactMessage,
} = require("../controllers/contactMessage.controller");

router.get("/", authMiddleware, getContactMessages);
router.post("/", createContactMessage);
router.put("/:id", authMiddleware, updateContactMessage);
router.delete("/:id", authMiddleware, deleteContactMessage);

module.exports = router;