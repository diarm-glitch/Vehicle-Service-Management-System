const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getServicingRequests,
  getUserServicingRequests,
  createServicingRequest,
  updateServicingRequest,
  deleteServicingRequest,
} = require("../controllers/servicingRequest.controller");

router.get("/", authMiddleware, getServicingRequests);

router.get("/user/:userId", authMiddleware, getUserServicingRequests);

router.post("/", createServicingRequest);

router.put("/:id", authMiddleware, updateServicingRequest);

router.delete("/:id", authMiddleware, deleteServicingRequest);

module.exports = router;