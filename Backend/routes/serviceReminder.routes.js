const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const {
  getServiceReminders,
  getServiceReminderById,
  createServiceReminder,
  updateServiceReminder,
  deleteServiceReminder
} = require('../controllers/serviceReminder.controller');

router.get('/', authMiddleware, getServiceReminders);
router.get('/:id', authMiddleware, getServiceReminderById);
router.post('/', authMiddleware, createServiceReminder);
router.put('/:id', authMiddleware, updateServiceReminder);
router.delete('/:id', authMiddleware, deleteServiceReminder);

module.exports = router;