const db = require('../config/db');

exports.getInvoices = (req, res) => {
  db.query('SELECT * FROM invoices', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getInvoiceById = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM invoices WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json(results[0]);
  });
};

exports.createInvoice = (req, res) => {
  const { service_record_id, shuma_punes, shuma_pjeseve, totali, statusi, data } = req.body;

  if (!service_record_id || shuma_punes === undefined || shuma_pjeseve === undefined || totali === undefined) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'INSERT INTO invoices (service_record_id, shuma_punes, shuma_pjeseve, totali, statusi, data) VALUES (?, ?, ?, ?, ?, ?)',
    [service_record_id, shuma_punes, shuma_pjeseve, totali, statusi || 'Unpaid', data],
    (err) => {
      if (err) return res.status(500).json({ message: 'Creation failed', error: err });

      res.status(201).json({ message: 'Invoice created successfully' });
    }
  );
};

exports.updateInvoice = (req, res) => {
  const id = req.params.id;
  const { service_record_id, shuma_punes, shuma_pjeseve, totali, statusi, data } = req.body;

  if (!service_record_id || shuma_punes === undefined || shuma_pjeseve === undefined || totali === undefined) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'UPDATE invoices SET service_record_id = ?, shuma_punes = ?, shuma_pjeseve = ?, totali = ?, statusi = ?, data = ? WHERE id = ?',
    [service_record_id, shuma_punes, shuma_pjeseve, totali, statusi, data, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Update failed', error: err });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Invoice not found' });
      }

      res.status(200).json({ message: 'Invoice updated successfully' });
    }
  );
};

exports.deleteInvoice = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM invoices WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Delete failed', error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json({ message: 'Invoice deleted successfully' });
  });
};