const db = require('../config/db');

exports.getUserClaims = (req, res) => {
  db.query('SELECT * FROM UserClaims', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getUserClaimById = (req, res) => {
  db.query('SELECT * FROM UserClaims WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'User claim not found' });
    res.status(200).json(results[0]);
  });
};

exports.createUserClaim = (req, res) => {
  const { user_id, claim_type, claim_value } = req.body;

  if (!user_id || !claim_type || !claim_value) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  db.query(
    'INSERT INTO UserClaims (user_id, claim_type, claim_value) VALUES (?, ?, ?)',
    [user_id, claim_type, claim_value],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'User claim creation failed', error: err });
      res.status(201).json({ message: 'User claim created successfully', id: result.insertId });
    }
  );
};

exports.updateUserClaim = (req, res) => {
  const { user_id, claim_type, claim_value } = req.body;

  db.query(
    'UPDATE UserClaims SET user_id = ?, claim_type = ?, claim_value = ? WHERE id = ?',
    [user_id, claim_type, claim_value, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'User claim update failed', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'User claim not found' });
      res.status(200).json({ message: 'User claim updated successfully' });
    }
  );
};

exports.deleteUserClaim = (req, res) => {
  db.query('DELETE FROM UserClaims WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'User claim delete failed', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User claim not found' });
    res.status(200).json({ message: 'User claim deleted successfully' });
  });
};