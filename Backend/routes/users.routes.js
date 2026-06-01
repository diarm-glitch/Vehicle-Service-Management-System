const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware')

const usersController = require('../controllers/users.controller');

router.get('/', authMiddleware, usersController.getUsers);
router.get('/:id', authMiddleware, usersController.getUserById);
router.post('/', authMiddleware, usersController.createUser);
router.put('/:id', authMiddleware, usersController.updateUser);
router.delete('/:id', authMiddleware, usersController.deleteUser);

module.exports = router;