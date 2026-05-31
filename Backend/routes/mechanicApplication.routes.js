const express = require("express");
const router = express.Router();
const multer = require("multer");

const authMiddleware = require("../middleware/auth.middleware");

const {
  getMechanicApplications,
  createMechanicApplication,
  updateMechanicApplication,
  deleteMechanicApplication,
} = require("../controllers/mechanicApplication.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", authMiddleware, getMechanicApplications);
router.post("/", upload.single("cv_file"), createMechanicApplication);
router.put("/:id", authMiddleware, updateMechanicApplication);
router.delete("/:id", authMiddleware, deleteMechanicApplication);

module.exports = router;