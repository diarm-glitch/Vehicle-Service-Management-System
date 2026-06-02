const db = require('../config/db');

exports.getServiceTypes = (req, res) => {
  db.query('SELECT * FROM servicetypes', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getServiceTypeById = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM servicetypes WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Service type not found' });
    }

    res.status(200).json(results[0]);
  });
};

exports.createServiceType = (req, res) => {
  const { emertimi, pershkrimi, cmimi_baze, kohezgjatja_mesatare } = req.body;

  if (!emertimi || !cmimi_baze) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'INSERT INTO servicetypes (emertimi, pershkrimi, cmimi_baze, kohezgjatja_mesatare) VALUES (?, ?, ?, ?)',
    [emertimi, pershkrimi, cmimi_baze, kohezgjatja_mesatare],
    (err) => {
      if (err) return res.status(500).json({ message: 'Creation failed', error: err });

      res.status(201).json({ message: 'Service type created successfully' });
    }
  );
};

exports.updateServiceType = (req, res) => {
  const id = req.params.id;
  const { emertimi, pershkrimi, cmimi_baze, kohezgjatja_mesatare } = req.body;

  if (!emertimi || !cmimi_baze) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'UPDATE servicetypes SET emertimi = ?, pershkrimi = ?, cmimi_baze = ?, kohezgjatja_mesatare = ? WHERE id = ?',
    [emertimi, pershkrimi, cmimi_baze, kohezgjatja_mesatare, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Update failed', error: err });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Service type not found' });
      }

      res.status(200).json({ message: 'Service type updated successfully' });
    }
  );
};

exports.deleteServiceType = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM servicetypes WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Delete failed', error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Service type not found' });
    }

    res.status(200).json({ message: 'Service type deleted successfully' });
  });
};