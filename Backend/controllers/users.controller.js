const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getUsers = (req, res) => {
  db.query('SELECT id, emri, mbiemri, email, phone_number, data_krijimit, statusi FROM Users', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getUserById = (req, res) => {
  db.query(
    'SELECT id, emri, mbiemri, email, phone_number, data_krijimit, statusi FROM Users WHERE id = ?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      if (results.length === 0) return res.status(404).json({ message: 'User not found' });
      res.status(200).json(results[0]);
    }
  );
};

exports.createUser = async (req, res) => {
  const { emri, mbiemri, email, password, phone_number, statusi } = req.body;

  if (!emri || !mbiemri || !email || !password) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO Users (emri, mbiemri, email, password_hash, phone_number, statusi) VALUES (?, ?, ?, ?, ?, ?)',
      [emri, mbiemri, email, password_hash, phone_number || null, statusi || 'active'],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'User creation failed', error: err });
        res.status(201).json({ message: 'User created successfully', id: result.insertId });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateUser = (req, res) => {
  const { emri, mbiemri, email, phone_number, statusi } = req.body;

  db.query(
    'UPDATE Users SET emri = ?, mbiemri = ?, email = ?, phone_number = ?, statusi = ? WHERE id = ?',
    [emri, mbiemri, email, phone_number, statusi, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'User update failed', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
      res.status(200).json({ message: 'User updated successfully' });
    }
  );
};

exports.deleteUser = (req, res) => {
  db.query('DELETE FROM Users WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'User delete failed', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  });
};