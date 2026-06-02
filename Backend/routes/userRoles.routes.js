const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

const userRolesController = require('../controllers/userRoles.controller');

router.get('/', authMiddleware, userRolesController.getUserRoles);
router.get('/:id', authMiddleware, userRolesController.getUserRoleById);
router.post('/', authMiddleware, userRolesController.createUserRole);
router.put('/:id', authMiddleware, userRolesController.updateUserRole);
router.delete('/:id', authMiddleware, userRolesController.deleteUserRole);

module.exports = router;