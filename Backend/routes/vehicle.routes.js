const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const {
  getVehicles,
  getMyVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehicle.controller');

router.get('/', authMiddleware, getVehicles);
router.get('/my-status/:userId', authMiddleware, getMyVehicles);
router.get('/:id', authMiddleware, getVehicleById);
router.post('/', authMiddleware, createVehicle);
router.put('/:id', authMiddleware, updateVehicle);
router.delete('/:id', authMiddleware, deleteVehicle);

module.exports = router;