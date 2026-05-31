const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const {
  getServiceParts,
  getServicePartById,
  createServicePart,
  updateServicePart,
  deleteServicePart
} = require('../controllers/servicePart.controller');

router.get('/', authMiddleware, getServiceParts);
router.get('/:id', authMiddleware, getServicePartById);
router.post('/', authMiddleware, createServicePart);
router.put('/:id', authMiddleware, updateServicePart);
router.delete('/:id', authMiddleware, deleteServicePart);

module.exports = router;