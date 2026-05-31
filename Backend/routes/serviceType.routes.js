const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const {
  getServiceTypes,
  getServiceTypeById,
  createServiceType,
  updateServiceType,
  deleteServiceType
} = require('../controllers/serviceType.controller');

router.get('/', authMiddleware, getServiceTypes);
router.get('/:id', authMiddleware, getServiceTypeById);
router.post('/', authMiddleware, createServiceType);
router.put('/:id', authMiddleware, updateServiceType);
router.delete('/:id', authMiddleware, deleteServiceType);

module.exports = router;