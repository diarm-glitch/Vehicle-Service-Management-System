const db = require("../config/db");

exports.getContactMessages = (req, res) => {
  db.query("SELECT * FROM contact_messages ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.status(200).json(results);
  });
};

exports.createContactMessage = (req, res) => {
  const { full_name, email, message } = req.body;

  if (!full_name || !email || !message) {
    return res.status(400).json({ message: "Please fill required fields" });
  }

  db.query(
    `INSERT INTO contact_messages 
    (full_name, email, message, statusi) 
    VALUES (?, ?, ?, ?)`,
    [full_name, email, message, "Unread"],
    (err) => {
      if (err) return res.status(500).json({ message: "Create failed", error: err });
      res.status(201).json({ message: "Contact message sent successfully" });
    }
  );
};

exports.updateContactMessage = (req, res) => {
  const { statusi } = req.body;

  db.query(
    "UPDATE contact_messages SET statusi = ? WHERE id = ?",
    [statusi, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Update failed", error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Message not found" });
      res.status(200).json({ message: "Message updated successfully" });
    }
  );
};

exports.deleteContactMessage = (req, res) => {
  db.query("DELETE FROM contact_messages WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: "Delete failed", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Message not found" });
    res.status(200).json({ message: "Message deleted successfully" });
  });
};