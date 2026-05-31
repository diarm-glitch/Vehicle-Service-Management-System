const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const {
  getParts,
  getPartById,
  createPart,
  updatePart,
  deletePart
} = require('../controllers/part.controller');

router.get('/', authMiddleware, getParts);
router.get('/:id', authMiddleware, getPartById);
router.post('/', authMiddleware, createPart);
router.put('/:id', authMiddleware, updatePart);
router.delete('/:id', authMiddleware, deletePart);

module.exports = router;