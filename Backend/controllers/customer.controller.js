const db = require('../config/db');

exports.getCustomers = (req, res) => {
  db.query('SELECT * FROM Customers', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    res.status(200).json(results);
  });
};

exports.getCustomerById = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM Customers WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.status(200).json(results[0]);
  });
};

exports.createCustomer = (req, res) => {
  const {emri, mbiemri, telefoni, email, adresa} = req.body;

  if (!emri || !mbiemri || !telefoni || !email) {
    return res.status(400).json ({message: 'Please fill all required fields'});
  }

  db.query (
    'INSERT INTO Customers (emri, mbiemri, telefoni, email, adresa) VALUES (?, ?, ?, ?, ?)',
    [emri, mbiemri, telefoni, email, adresa],
    (err) => {
      if (err) {
        return res.status(500).json({message: 'Customers creation failed', error: err});
      }
      
      res.status(201).json({message: 'Customers created successfully'});
    }
  );
};

exports.updateCustomer = (req, res) => {
  const id = req.params ? req.params.id : null;
  console.log("PARAMS:", req.params);
  console.log("ID:", id);
  
  const {emri, mbiemri, telefoni, email, adresa} = req.body;

  db.query(
    'UPDATE Customers SET emri = ?, mbiemri = ?, telefoni = ?, email = ?, adresa = ? WHERE id = ?',
    [emri, mbiemri, telefoni, email, adresa, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({message: 'Customer update fialed', error: err});
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({message: "Customer not found"});
      }

      res.status(200).json({message: 'Customer updated successfully'});
    }
  );
};

exports.deleteCustomer = (req, res) => {
  const id = req.params.id;

  db.query(
    'DELETE FROM Customers WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Delete failed', error: err });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      res.status(200).json({ message: 'Customer deleted successfully' });
    }
  );
};