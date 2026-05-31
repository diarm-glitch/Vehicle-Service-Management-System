const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');

const rolesController = require('../controllers/roles.controller');

router.get('/' , authMiddleware, rolesController.getRoles);
router.get('/:id', authMiddleware, rolesController.getRoleById);
router.post('/', authMiddleware, rolesController.createRole);
router.put('/:id', authMiddleware, rolesController.updateRole);
router.delete('/:id', authMiddleware, rolesController.deleteRole);

module.exports = router;