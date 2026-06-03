const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getPublicReviews,
  getMyReviews,
  createReview,
  deleteMyReview,
} = require("../controllers/carReview.controller");

router.get("/", getPublicReviews);

router.get("/my-reviews", authMiddleware, getMyReviews);

router.post("/", authMiddleware, createReview);

router.delete("/:id", authMiddleware, deleteMyReview);

module.exports = router;