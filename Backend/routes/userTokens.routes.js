const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const {
  getUserTokens,
  getUserTokenById,
  createUserToken,
  updateUserToken,
  deleteUserToken
} = require('../controllers/userTokens.controller');

router.get('/', authMiddleware, getUserTokens);
router.get('/:id', authMiddleware, getUserTokenById);
router.post('/', authMiddleware, createUserToken);
router.put('/:id', authMiddleware, updateUserToken);
router.delete('/:id', authMiddleware, deleteUserToken);

module.exports = router;