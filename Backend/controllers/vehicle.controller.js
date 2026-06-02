const db = require('../config/db');

exports.getVehicles = (req, res) => {
  db.query('SELECT * FROM Vehicles', (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
};

exports.getVehicleById = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM Vehicles WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json(results[0]);
  });
};

exports.getMyVehicles = (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT 
      v.*,
      sr.statusi AS service_status,
      sr.pershkrimi AS service_description,
      sr.data_fillimit,
      sr.data_perfundimit
    FROM Vehicles v
    INNER JOIN Customers c ON v.customer_id = c.id
    LEFT JOIN ServiceRecords sr ON sr.vehicle_id = v.id
    WHERE c.user_id = ?
    ORDER BY sr.id DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err,
      });
    }

    res.status(200).json(results);
  });
};

exports.createVehicle = (req, res) => {
  const { customer_id, marka, modeli, viti, targa, kilometrazhi, ngjyra } = req.body;

  if (!customer_id || !marka || !modeli || !viti || !targa) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  db.query(
    'INSERT INTO Vehicles (customer_id, marka, modeli, viti, targa, kilometrazhi, ngjyra) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [customer_id, marka, modeli, viti, targa, kilometrazhi, ngjyra],
    (err) => {
      if (err) return res.status(500).json({ message: 'Vehicle creation failed', error: err });

      res.status(201).json({ message: 'Vehicle created successfully' });
    }
  );
};

exports.updateVehicle = (req, res) => {
  const id = req.params.id;
  const { customer_id, marka, modeli, viti, targa, kilometrazhi, ngjyra } = req.body;

  db.query(
    'UPDATE Vehicles SET customer_id = ?, marka = ?, modeli = ?, viti = ?, targa = ?, kilometrazhi = ?, ngjyra = ? WHERE id = ?',
    [customer_id, marka, modeli, viti, targa, kilometrazhi, ngjyra, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Vehicle update failed', error: err });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }

      res.status(200).json({ message: 'Vehicle updated successfully' });
    }
  );
};

exports.deleteVehicle = (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM Vehicles WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Delete failed', error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Vehicle not found' });
    }

    res.status(200).json({ message: 'Vehicle deleted successfully' });
  });
};