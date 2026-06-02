const db = require('../config/db');

exports.getUserTokens = (req, res) => {
  db.query('SELECT * FROM UserTokens', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getUserTokenById = (req, res) => {
  db.query('SELECT * FROM UserTokens WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'User token not found' });
    res.status(200).json(results[0]);
  });
};

exports.createUserToken = (req, res) => {
  const { user_id, login_provider, token_name, token_value } = req.body;

  if (!user_id || !login_provider || !token_name || !token_value) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  db.query(
    'INSERT INTO UserTokens (user_id, login_provider, token_name, token_value) VALUES (?, ?, ?, ?)',
    [user_id, login_provider, token_name, token_value],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'User token creation failed', error: err });
      res.status(201).json({ message: 'User token created successfully', id: result.insertId });
    }
  );
};

exports.updateUserToken = (req, res) => {
  const { user_id, login_provider, token_name, token_value } = req.body;

  db.query(
    'UPDATE UserTokens SET user_id = ?, login_provider = ?, token_name = ?, token_value = ? WHERE id = ?',
    [user_id, login_provider, token_name, token_value, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'User token update failed', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'User token not found' });
      res.status(200).json({ message: 'User token updated successfully' });
    }
  );
};

exports.deleteUserToken = (req, res) => {
  db.query('DELETE FROM UserTokens WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'User token delete failed', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User token not found' });
    res.status(200).json({ message: 'User token deleted successfully' });
  });
};