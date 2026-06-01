const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');

const {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice
} = require('../controllers/invoice.controller');

router.get('/', authMiddleware, getInvoices);
router.get('/:id', authMiddleware, getInvoiceById);
router.post('/', authMiddleware, createInvoice);
router.put('/:id', authMiddleware, updateInvoice);
router.delete('/:id', authMiddleware, deleteInvoice);

module.exports = router;