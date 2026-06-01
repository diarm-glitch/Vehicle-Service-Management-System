const db = require('../config/db');

exports.getServiceRecords = (req, res) => {
  db.query('SELECT * FROM servicerecords', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getServiceRecordById = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM servicerecords WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Service record not found' });
    }

    res.status(200).json(results[0]);
  });
};

exports.createServiceRecord = (req, res) => {
  const {
    appointment_id, vehicle_id, tekniku_id, pershkrimi, data_fillimit, data_perfundimit, statusi } = req.body;

  if (!appointment_id || !vehicle_id || !tekniku_id || !pershkrimi || !data_fillimit) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'INSERT INTO servicerecords (appointment_id, vehicle_id, tekniku_id, pershkrimi, data_fillimit, data_perfundimit, statusi) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [appointment_id, vehicle_id, tekniku_id, pershkrimi, data_fillimit, data_perfundimit, statusi || 'In Progress'],
    (err) => {
      if (err) return res.status(500).json({ message: 'Creation failed', error: err });

      res.status(201).json({ message: 'Service record created successfully' });
    }
  );
};

exports.updateServiceRecord = (req, res) => {
  const id = req.params.id;
  const {
    appointment_id, vehicle_id, tekniku_id, pershkrimi, data_fillimit, data_perfundimit, statusi } = req.body;

  if (!appointment_id || !vehicle_id || !tekniku_id || !pershkrimi || !data_fillimit) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'UPDATE servicerecords SET appointment_id = ?, vehicle_id = ?, tekniku_id = ?, pershkrimi = ?, data_fillimit = ?, data_perfundimit = ?, statusi = ? WHERE id = ?',
    [appointment_id, vehicle_id, tekniku_id, pershkrimi, data_fillimit, data_perfundimit, statusi, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Update failed', error: err });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Service record not found' });
      }

      res.status(200).json({ message: 'Service record updated successfully' });
    }
  );
};

exports.deleteServiceRecord = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM servicerecords WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Delete failed', error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service record not found' });
    }

    res.status(200).json({ message: 'Service record deleted successfully' });
  });
};