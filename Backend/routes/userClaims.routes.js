const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const {
  getUserClaims,
  getUserClaimById,
  createUserClaim,
  updateUserClaim,
  deleteUserClaim
} = require('../controllers/userClaims.controller');

router.get('/', authMiddleware, getUserClaims);
router.get('/:id', authMiddleware, getUserClaimById);
router.post('/', authMiddleware, createUserClaim);
router.put('/:id', authMiddleware, updateUserClaim);
router.delete('/:id', authMiddleware, deleteUserClaim);

module.exports = router;