const db = require('../config/db');

exports.getServiceReminders = (req, res) => {
  db.query('SELECT * FROM servicereminders', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getServiceReminderById = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM servicereminders WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Service reminder not found' });
    }

    res.status(200).json(results[0]);
  });
};

exports.createServiceReminder = (req, res) => {
  const { vehicle_id, lloji_servisimit, data_ardhshme, kilometrazhi_ardhshem, statusi } = req.body;

  if (!vehicle_id || !lloji_servisimit || !data_ardhshme) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'INSERT INTO servicereminders (vehicle_id, lloji_servisimit, data_ardhshme, kilometrazhi_ardhshem, statusi) VALUES (?, ?, ?, ?, ?)',
    [vehicle_id, lloji_servisimit, data_ardhshme, kilometrazhi_ardhshem, statusi || 'Pending'],
    (err) => {
      if (err) return res.status(500).json({ message: 'Creation failed', error: err });

      res.status(201).json({ message: 'Service reminder created successfully' });
    }
  );
};

exports.updateServiceReminder = (req, res) => {
  const id = req.params.id;
  const { vehicle_id, lloji_servisimit, data_ardhshme, kilometrazhi_ardhshem, statusi } = req.body;

  if (!vehicle_id || !lloji_servisimit || !data_ardhshme) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'UPDATE servicereminders SET vehicle_id = ?, lloji_servisimit = ?, data_ardhshme = ?, kilometrazhi_ardhshem = ?, statusi = ? WHERE id = ?',
    [vehicle_id, lloji_servisimit, data_ardhshme, kilometrazhi_ardhshem, statusi, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Update failed', error: err });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Service reminder not found' });
      }

      res.status(200).json({ message: 'Service reminder updated successfully' });
    }
  );
};

exports.deleteServiceReminder = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM servicereminders WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Delete failed', error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service reminder not found' });
    }

    res.status(200).json({ message: 'Service reminder deleted successfully' });
  });
};