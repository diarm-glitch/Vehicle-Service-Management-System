const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const {
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment
} = require('../controllers/appointment.controller');

router.get('/', authMiddleware, getAppointments);
router.get('/:id', authMiddleware, getAppointmentById);
router.post('/', authMiddleware, createAppointment);
router.put('/:id', authMiddleware, updateAppointment);
router.delete('/:id', authMiddleware, deleteAppointment);

module.exports = router;