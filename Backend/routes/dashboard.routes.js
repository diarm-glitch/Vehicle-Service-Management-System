const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const {
  getTodayAppointments,
  getRevenue,
  getPartsStock,
  getTotalCustomers,
  getTotalVehicles,
  getTotalAppointmens,
  getTotalInvoices,
  getLowStockParts
} = require('../controllers/dashboard.controller');

router.get('/today-appointments', authMiddleware, getTodayAppointments);
router.get('/revenue', authMiddleware, getRevenue);
router.get('/parts-stock', authMiddleware, getPartsStock);
router.get('/total-customers', authMiddleware, getTotalCustomers);
router.get('/total-vehicles', authMiddleware, getTotalVehicles);
router.get('/total-appointments', authMiddleware, getTotalAppointmens);
router.get('/total-invoices', authMiddleware, getTotalInvoices);
router.get('/low-stock-parts', authMiddleware, getLowStockParts);

module.exports = router;