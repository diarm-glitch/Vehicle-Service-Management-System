const db = require('../config/db');

exports.getParts = (req, res) => {
  db.query('SELECT * FROM parts', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getPartById = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM parts WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.status(200).json(results[0]);
  });
};

exports.createPart = (req, res) => {
  const { emertimi, pershkrimi, cmimi, sasia, kodi, furnitori } = req.body;

  if (!emertimi || !cmimi || sasia === undefined) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'INSERT INTO parts (emertimi, pershkrimi, cmimi, sasia, kodi, furnitori) VALUES (?, ?, ?, ?, ?, ?)',
    [emertimi, pershkrimi, cmimi, sasia, kodi, furnitori],
    (err) => {
      if (err) return res.status(500).json({ message: 'Creation failed', error: err });

      res.status(201).json({ message: 'Part created successfully' });
    }
  );
};

exports.updatePart = (req, res) => {
  const id = req.params.id;
  const { emertimi, pershkrimi, cmimi, sasia, kodi, furnitori } = req.body;

  if (!emertimi || !cmimi || sasia === undefined) {
    return res.status(400).json({ message: 'Please fill required fields' });
  }

  db.query(
    'UPDATE parts SET emertimi = ?, pershkrimi = ?, cmimi = ?, sasia = ?, kodi = ?, furnitori = ? WHERE id = ?',
    [emertimi, pershkrimi, cmimi, sasia, kodi, furnitori, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Update failed', error: err });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Part not found' });
      }

      res.status(200).json({ message: 'Part updated successfully' });
    }
  );
};

exports.deletePart = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM parts WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Delete failed', error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Part not found' });
    }

    res.status(200).json({ message: 'Part deleted successfully' });
  });
};