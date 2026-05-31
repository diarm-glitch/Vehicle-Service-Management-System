const db = require('../config/db');

exports.getRoles = (req, res) => {
  db.query('SELECT * FROM Roles', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getRoleById = (req, res) => {
  db.query('SELECT * FROM Roles WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Role not found' });
    res.status(200).json(results[0]);
  });
};

exports.createRole = (req, res) => {
  const { emertimi, pershkrimi, normalized_name } = req.body;

  if (!emertimi) {
    return res.status(400).json({ message: 'Role name is required' });
  }

  db.query(
    'INSERT INTO Roles (emertimi, pershkrimi, normalized_name) VALUES (?, ?, ?)',
    [emertimi, pershkrimi || null, normalized_name || emertimi.toUpperCase()],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Role creation failed', error: err });
      res.status(201).json({ message: 'Role created successfully', id: result.insertId });
    }
  );
};

exports.updateRole = (req, res) => {
  const { emertimi, pershkrimi, normalized_name } = req.body;

  db.query(
    'UPDATE Roles SET emertimi = ?, pershkrimi = ?, normalized_name = ? WHERE id = ?',
    [emertimi, pershkrimi, normalized_name || emertimi.toUpperCase(), req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Role update failed', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Role not found' });
      res.status(200).json({ message: 'Role updated successfully' });
    }
  );
};

exports.deleteRole = (req, res) => {
  db.query('DELETE FROM Roles WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Role delete failed', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Role not found' });
    res.status(200).json({ message: 'Role deleted successfully' });
  });
};