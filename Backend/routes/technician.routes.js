const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const {
  getTechnicians,
  getTechnicianById,
  createTechnician,
  updateTechnician,
  deleteTechnician
} = require('../controllers/technician.controller');

router.get('/', authMiddleware, getTechnicians);
router.get('/:id', authMiddleware, getTechnicianById);
router.post('/', authMiddleware, createTechnician);
router.put('/:id', authMiddleware, updateTechnician);
router.delete('/:id', authMiddleware, deleteTechnician);

module.exports = router;