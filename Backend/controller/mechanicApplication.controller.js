const db = require("../config/db");

exports.getMechanicApplications = (req, res) => {
  db.query("SELECT * FROM mechanic_applications ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(200).json(results);
  });
};

exports.createMechanicApplication = (req, res) => {
  const {
    full_name,
    email,
    phone_number,
    experience_years,
    specialization,
    about_text,
  } = req.body;

  const cv_file = req.file ? req.file.filename : "";

  if (!full_name || !email || !phone_number) {
    return res.status(400).json({ message: "Please fill required fields" });
  }

  db.query(
    `INSERT INTO mechanic_applications
    (full_name, email, phone_number, experience_years, specialization, about_text, cv_file, statusi)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      full_name,
      email,
      phone_number,
      experience_years,
      specialization,
      about_text,
      cv_file || "",
      "Pending",
    ],
    (err) => {
      if (err) return res.status(500).json({ message: "Create failed", error: err });
      res.status(201).json({ message: "Mechanic application submitted successfully" });
    }
  );
};

exports.updateMechanicApplication = (req, res) => {
  const { statusi } = req.body;

  db.query(
    "UPDATE mechanic_applications SET statusi = ? WHERE id = ?",
    [statusi, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Update failed", error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Application not found" });
      res.status(200).json({ message: "Application updated successfully" });
    }
  );
};

exports.deleteMechanicApplication = (req, res) => {
  db.query("DELETE FROM mechanic_applications WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Delete failed", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Application not found" });
    res.status(200).json({ message: "Application deleted successfully" });
  });
};