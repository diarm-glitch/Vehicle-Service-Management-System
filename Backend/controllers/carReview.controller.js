const db = require("../config/db");

exports.getPublicReviews = (req, res) => {
  db.query(
    `SELECT cr.*, u.emri, u.mbiemri
     FROM car_reviews cr
     LEFT JOIN Users u ON cr.user_id = u.id
     ORDER BY cr.created_at DESC`,
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      res.status(200).json(results);
    }
  );
};

exports.getMyReviews = (req, res) => {
  db.query(
    "SELECT * FROM car_reviews WHERE user_id = ? ORDER BY created_at DESC",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      res.status(200).json(results);
    }
  );
};

exports.createReview = (req, res) => {
  const { car_make, car_model, car_year, rating, title, review_text } = req.body;

  if (!car_make || !car_model || !rating || !title || !review_text) {
    return res.status(400).json({ message: "Please fill required fields" });
  }

  db.query(
    `INSERT INTO car_reviews 
    (user_id, car_make, car_model, car_year, rating, title, review_text)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [req.user.id, car_make, car_model, car_year, rating, title, review_text],
    (err) => {
      if (err) return res.status(500).json({ message: "Create failed", error: err });
      res.status(201).json({ message: "Review added successfully" });
    }
  );
};

exports.deleteMyReview = (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.id;

  const sql = "DELETE FROM car_reviews WHERE id = ? AND user_id = ?";

  db.query(sql, [reviewId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Delete failed", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  });
};