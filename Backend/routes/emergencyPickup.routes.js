const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getEmergencyPickups,
  createEmergencyPickup,
  updateEmergencyPickup,
  deleteEmergencyPickup,
} = require("../controllers/emergencyPickup.controller");

router.get("/", authMiddleware, getEmergencyPickups);
router.post("/", createEmergencyPickup);
router.put("/:id", authMiddleware, updateEmergencyPickup);
router.delete("/:id", authMiddleware, deleteEmergencyPickup);

module.exports = router;