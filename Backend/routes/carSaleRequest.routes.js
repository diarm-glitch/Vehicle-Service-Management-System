const express = require("express");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getAllSaleRequests,
  getMySaleRequests,
  createSaleRequest,
  deleteMySaleRequest,
} = require("../controllers/carSaleRequest.controller");

router.get("/", getAllSaleRequests);

router.get("/my-requests", authMiddleware, getMySaleRequests);

router.post("/", authMiddleware, upload.single("image"), createSaleRequest);

router.delete("/:id", authMiddleware, deleteMySaleRequest);

module.exports = router;