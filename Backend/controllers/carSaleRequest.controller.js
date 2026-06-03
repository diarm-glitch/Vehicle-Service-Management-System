const db = require("../config/db");

exports.getAllSaleRequests = (req, res) => {
  const sql = `
    SELECT csr.*, u.emri, u.mbiemri
    FROM car_sale_requests csr
    LEFT JOIN users u ON csr.user_id = u.id
    ORDER BY csr.created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error",
        error: err,
      });
    }

    res.status(200).json(results);
  });
};

exports.getMySaleRequests = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT *
    FROM car_sale_requests
    WHERE user_id = ?
    ORDER BY created_at DESC
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

exports.createSaleRequest = (req, res) => {
  const userId = req.user.id;

  const {
    car_make,
    car_model,
    car_year,
    mileage,
    fuel_type,
    price,
    description,
  } = req.body;

  const image = req.file ? req.file.filename : null;

  if (!car_make || !car_model || !car_year || !price) {
    return res.status(400).json({
      message: "Car make, model, year, and price are required",
    });
  }

  const sql = `
    INSERT INTO car_sale_requests (user_id, car_make, car_model,car_year, mileage, fuel_type, price, description, image) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

  db.query(
    sql,
    [
      userId,
      car_make,
      car_model,
      car_year,
      mileage,
      fuel_type,
      price,
      description,
      image,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Create sale request failed",
          error: err,
        });
      }

      res.status(201).json({
        message: "Car sale request created successfully",
        id: result.insertId,
      });
    }
  );
};

exports.deleteMySaleRequest = (req, res) => {
  const userId = req.user.id;
  const saleId = req.params.id;

  const sql = "DELETE FROM car_sale_requests WHERE id = ? AND user_id = ?";

  db.query(sql, [saleId, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Delete failed", error: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Sale request not found" });
    }

    res.status(200).json({ message: "Sale request deleted successfully" });
  });
};