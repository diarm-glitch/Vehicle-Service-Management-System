const authMiddleware = require('../middleware/auth.middleware');
const express = require('express');
const router = express.Router();
console.log('AUTH ROUTES FILE LOADED');

const {
    register,
    login,
    refreshToken
} = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);

router.get('/test', (req, res) => {
  res.send('Auth test works');
});

router.get('/profile', authMiddleware, (req, res) => {
    res.json({
        message:'Protected profile route',
        user:req.user
    });
});

module.exports = router;