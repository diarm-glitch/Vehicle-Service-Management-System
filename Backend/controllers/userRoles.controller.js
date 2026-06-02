const db = require('../config/db');

exports.getUserRoles = (req, res) => {
  const query = `
    SELECT 
      UserRoles.id,
      Users.id AS user_id,
      Users.emri,
      Users.mbiemri,
      Users.email,
      Roles.id AS role_id,
      Roles.emertimi AS role_name
    FROM UserRoles
    JOIN Users ON UserRoles.user_id = Users.id
    JOIN Roles ON UserRoles.role_id = Roles.id
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getUserRoleById = (req, res) => {
  const query = `
    SELECT 
      UserRoles.id,
      Users.id AS user_id,
      Users.emri,
      Users.mbiemri,
      Users.email,
      Roles.id AS role_id,
      Roles.emertimi AS role_name
    FROM UserRoles
    JOIN Users ON UserRoles.user_id = Users.id
    JOIN Roles ON UserRoles.role_id = Roles.id
    WHERE UserRoles.id = ?
  `;

  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) return res.status(404).json({ message: 'UserRole not found' });
    res.status(200).json(results[0]);
  });
};

exports.createUserRole = (req, res) => {
  const { user_id, role_id } = req.body;

  if (!user_id || !role_id) {
    return res.status(400).json({ message: 'user_id and role_id are required' });
  }

  db.query(
    'INSERT INTO UserRoles (user_id, role_id) VALUES (?, ?)',
    [user_id, role_id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'UserRole creation failed', error: err });
      res.status(201).json({ message: 'UserRole created successfully', id: result.insertId });
    }
  );
};

exports.updateUserRole = (req, res) => {
  const { user_id, role_id } = req.body;

  db.query(
    'UPDATE UserRoles SET user_id = ?, role_id = ? WHERE id = ?',
    [user_id, role_id, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'UserRole update failed', error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'UserRole not found' });
      res.status(200).json({ message: 'UserRole updated successfully' });
    }
  );
};

exports.deleteUserRole = (req, res) => {
  db.query('DELETE FROM UserRoles WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: 'UserRole delete failed', error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'UserRole not found' });
    res.status(200).json({ message: 'UserRole deleted successfully' });
  });
};