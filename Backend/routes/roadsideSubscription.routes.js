const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  getRoadsideSubscriptions,
  getUserRoadsideSubscriptions,
  createRoadsideSubscription,
  approveRoadsideSubscription,
  denyRoadsideSubscription,
  deleteRoadsideSubscription,
} = require("../controllers/roadsideSubscription.controller");

router.get("/", authMiddleware, getRoadsideSubscriptions);

router.get("/user/:userId", authMiddleware, getUserRoadsideSubscriptions);

router.post("/", authMiddleware, createRoadsideSubscription);

router.put("/approve/:id", authMiddleware, approveRoadsideSubscription);

router.put("/deny/:id", authMiddleware, denyRoadsideSubscription);

router.delete("/:id", authMiddleware, deleteRoadsideSubscription);

module.exports = router;