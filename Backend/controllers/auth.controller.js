const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  console.log("BODY:", req.body);

  const emri = req.body.emri;
  const mbiemri = req.body.mbiemri;
  const email = req.body.email;
  const password = req.body.password;
  const phone_number = req.body.phone_number;

  if (!emri || !mbiemri || !email || !password) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

    db.query(`
    SELECT
        u.*,
        r.emertimi AS role_name
    FROM Users u
    LEFT JOIN UserRoles ur ON u.id = ur.user_id
    LEFT JOIN Roles r ON ur.role_id = r.id
    WHERE u.email = ?`,
   [email], async (err, results) => {
    if (err) {
        return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.length > 0) {
        return res.status(400).json({ message: 'Email already exist' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
  'INSERT INTO Users (emri, mbiemri, email, password_hash, phone_number, statusi) VALUES (?, ?, ?, ?, ?, ?)',
  [emri, mbiemri, email, hashedPassword, phone_number, 'Active'],
  (err, result) => {
    if (err) {
      console.log("INSERT ERROR:", err);
      return res.status(500).json({ message: 'User registration failed', error: err });
    }

    const newUserId = result.insertId;

    db.query(
      'INSERT INTO UserRoles (user_id, role_id) VALUES (?, ?)',
      [newUserId, 5],
      (roleErr) => {
        if (roleErr) {
          console.log("ROLE INSERT ERROR:", roleErr);
          return res.status(500).json({
            message: 'User created but role assignment failed',
            error: roleErr
          });
        }

        res.status(201).json({ message: 'User registered successfully' });
      }
    );
  }
);
    } catch (error) {
        console.log("HASH ERROR:", error);
        res.status(500).json({ message: 'Hashing failed', error });
    }
});
};


exports.login = (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({message: 'Email and password are reuqired'});
    }

    db.query(`
    SELECT
        u.*,
        r.emertimi AS role_name
    FROM Users u
    LEFT JOIN UserRoles ur ON u.id = ur.user_id
    LEFT JOIN Roles r ON ur.role_id = r.id
    WHERE u.email = ?`,
   [email], async (err, results) => {
        if (err) {
            return res.status(500).json({message: 'Database error', error: err});
        }

        if (results.length === 0) {
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const user =
            results.find(r => r.role_name === "Premium User") ||
            results[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if(!isMatch) {
            return res.status(400).json({message:'Invalid email or password'});
        }

        const token = jwt.sign(
            { id: user.id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        const refreshToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json ({
            message:'Login successful',
            token:token,
            refreshToken: refreshToken,
            user: {
                id:user.id,
                emri:user.emri,
                mbiemri:user.mbiemri,
                email:user.email,
                role:user.role_name
            }
        });
    });
};

exports.refreshToken = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token required'});
    }

    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({message: 'Invalid refresh token'});
        }

        const newToken = jwt.sign(
            { id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.status(200).json({
            message:"Token refreshed successfully",
            token:newToken
        });
    });
};