const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getPrePurchaseInspectionRequests,
  getUserPrePurchaseInspectionRequests,
  createPrePurchaseInspectionRequest,
  updatePrePurchaseInspectionRequest,
  deletePrePurchaseInspectionRequest,
} = require("../controllers/prePurchaseInspectionRequest.controller");

router.get("/", authMiddleware, getPrePurchaseInspectionRequests);

router.get("/user/:userId", authMiddleware, getUserPrePurchaseInspectionRequests);

router.post("/", createPrePurchaseInspectionRequest);

router.put("/:id", authMiddleware, updatePrePurchaseInspectionRequest);

router.delete("/:id", authMiddleware, deletePrePurchaseInspectionRequest);

module.exports = router;