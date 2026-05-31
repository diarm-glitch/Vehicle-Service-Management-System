const db = require("../config/db");

exports.getServicingRequests = (req, res) => {
  db.query("SELECT * FROM servicing_requests ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(200).json(results);
  });
};

exports.getUserServicingRequests = (req, res) => {
  db.query(
    "SELECT * FROM servicing_requests WHERE user_id = ? ORDER BY id DESC",
    [req.params.userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      res.status(200).json(results);
    }
  );
};

exports.createServicingRequest = (req, res) => {
  const {
    user_id,
    full_name,
    email,
    phone,
    car_make,
    car_model,
    car_year,
    location,
    preferred_date,
    preferred_time,
    message,
  } = req.body;

  if (!full_name || !email || !phone || !car_make || !car_model || !location) {
    return res.status(400).json({ message: "Please fill required fields" });
  }

  db.query(
    `INSERT INTO servicing_requests
    (user_id, full_name, email, phone, car_make, car_model, car_year, location, preferred_date, preferred_time, message, statusi)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id,
      full_name,
      email,
      phone,
      car_make,
      car_model,
      car_year,
      location,
      preferred_date,
      preferred_time,
      message,
      "Pending",
    ],
    (err) => {
      if (err) return res.status(500).json({ message: "Create failed", error: err });
      res.status(201).json({ message: "Servicing request sent successfully" });
    }
  );
};

exports.updateServicingRequest = (req, res) => {
  const { statusi } = req.body;

  db.query(
    "UPDATE servicing_requests SET statusi = ? WHERE id = ?",
    [statusi, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Update failed", error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Request not found" });
      res.status(200).json({ message: "Request updated successfully" });
    }
  );
};

exports.deleteServicingRequest = (req, res) => {
  db.query("DELETE FROM servicing_requests WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Delete failed", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Request not found" });
    res.status(200).json({ message: "Request deleted successfully" });
  });
};