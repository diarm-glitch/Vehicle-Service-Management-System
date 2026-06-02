const db = require('../config/db');

exports.getTechnicians = (req, res) => {
  db.query('SELECT * FROM technicians', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getTechnicianById = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM technicians WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Technician not found' });
    }

    res.status(200).json(results[0]);
  });
};

exports.createTechnician = (req, res) => {
  const { user_id, emri, mbiemri, specializimi, telefoni } = req.body;

  if (!emri || !mbiemri || !specializimi) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'INSERT INTO technicians (user_id, emri, mbiemri, specializimi, telefoni) VALUES (?, ?, ?, ?, ?)',
    [user_id || null, emri, mbiemri, specializimi, telefoni],
    (err) => {
      if (err) return res.status(500).json({ message: 'Creation failed', error: err });

      res.status(201).json({ message: 'Technician created successfully' });
    }
  );
};

exports.updateTechnician = (req, res) => {
  const id = req.params.id;
  const { user_id, emri, mbiemri, specializimi, telefoni } = req.body;

  if (!emri || !mbiemri || !specializimi) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'UPDATE technicians SET user_id = ?, emri = ?, mbiemri = ?, specializimi = ?, telefoni = ? WHERE id = ?',
    [user_id || null, emri, mbiemri, specializimi, telefoni, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Update failed', error: err });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Technician not found' });
      }

      res.status(200).json({ message: 'Technician updated successfully' });
    }
  );
};

exports.deleteTechnician = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM technicians WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Delete failed', error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Technician not found' });
    }

    res.status(200).json({ message: 'Technician deleted successfully' });
  });
};