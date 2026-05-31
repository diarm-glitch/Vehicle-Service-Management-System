const db = require('../config/db');

exports.getServiceParts = (req, res) => {
  db.query('SELECT * FROM serviceparts', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getServicePartById = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM serviceparts WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Service part not found' });
    }

    res.status(200).json(results[0]);
  });
};

exports.createServicePart = (req, res) => {
  const { service_record_id, part_id, sasia, cmimi } = req.body;

  if (!service_record_id || !part_id || !sasia || !cmimi) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'INSERT INTO serviceparts (service_record_id, part_id, sasia, cmimi) VALUES (?, ?, ?, ?)',
    [service_record_id, part_id, sasia, cmimi],
    (err) => {
      if (err) return res.status(500).json({ message: 'Creation failed', error: err });

      res.status(201).json({ message: 'Service part created successfully' });
    }
  );
};

exports.updateServicePart = (req, res) => {
  const id = req.params.id;
  const { service_record_id, part_id, sasia, cmimi } = req.body;

  if (!service_record_id || !part_id || !sasia || !cmimi) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'UPDATE serviceparts SET service_record_id = ?, part_id = ?, sasia = ?, cmimi = ? WHERE id = ?',
    [service_record_id, part_id, sasia, cmimi, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Update failed', error: err });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Service part not found' });
      }

      res.status(200).json({ message: 'Service part updated successfully' });
    }
  );
};

exports.deleteServicePart = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM serviceparts WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Delete failed', error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service part not found' });
    }

    res.status(200).json({ message: 'Service part deleted successfully' });
  });
};