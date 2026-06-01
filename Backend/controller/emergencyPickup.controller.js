const db = require("../config/db");

exports.getEmergencyPickups = (req, res) => {
  db.query("SELECT * FROM emergency_pickups ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(200).json(results);
  });
};

exports.createEmergencyPickup = (req, res) => {
  const { emri, telefoni, lokacioni, nevoja_servisit } = req.body;

  if (!emri || !telefoni || !lokacioni || !nevoja_servisit) {
    return res.status(400).json({ message: "Please fill required fields" });
  }

  db.query(
    `INSERT INTO emergency_pickups 
    (emri, telefoni, lokacioni, nevoja_servisit, statusi) 
    VALUES (?, ?, ?, ?, ?)`,
    [emri, telefoni, lokacioni, nevoja_servisit, "Pending"],
    (err) => {
      if (err) return res.status(500).json({ message: "Create failed", error: err });
      res.status(201).json({ message: "Emergency pickup request submitted successfully" });
    }
  );
};

exports.updateEmergencyPickup = (req, res) => {
  const { statusi } = req.body;

  db.query(
    "UPDATE emergency_pickups SET statusi = ? WHERE id = ?",
    [statusi, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Update failed", error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Emergency pickup not found" });
      res.status(200).json({ message: "Emergency pickup updated successfully" });
    }
  );
};

exports.deleteEmergencyPickup = (req, res) => {
  db.query("DELETE FROM emergency_pickups WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Delete failed", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Emergency pickup not found" });
    res.status(200).json({ message: "Emergency pickup deleted successfully" });
  });
};