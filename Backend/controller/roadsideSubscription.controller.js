const db = require("../config/db");

exports.getRoadsideSubscriptions = (req, res) => {
  db.query(
    "SELECT * FROM roadside_subscription_requests ORDER BY id DESC",
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      res.status(200).json(results);
    }
  );
};

exports.getUserRoadsideSubscriptions = (req, res) => {
  db.query(
    "SELECT * FROM roadside_subscription_requests WHERE user_id = ? ORDER BY id DESC",
    [req.params.userId],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });
      res.status(200).json(results);
    }
  );
};

exports.createRoadsideSubscription = (req, res) => {
  const {
    user_id,
    full_name,
    phone,
    location,
    service_reason,
    message,
  } = req.body;

  if (!user_id || !full_name || !phone || !location) {
    return res.status(400).json({ message: "Please fill required fields" });
  }

  db.query(
    `INSERT INTO roadside_subscription_requests
    (user_id, full_name, phone, location, service_reason, message, statusi)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user_id, full_name, phone, location, service_reason, message, "Pending"],
    (err) => {
      if (err) return res.status(500).json({ message: "Create failed", error: err });
      res.status(201).json({ message: "Subscription request sent successfully" });
    }
  );
};

exports.approveRoadsideSubscription = (req, res) => {
  const requestId = req.params.id;

  db.query(
    "SELECT * FROM roadside_subscription_requests WHERE id = ?",
    [requestId],
    (err, requestResults) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });

      if (requestResults.length === 0) {
        return res.status(404).json({ message: "Request not found" });
      }

      const userId = requestResults[0].user_id;

      db.query(
        "UPDATE roadside_subscription_requests SET statusi = 'Approved' WHERE id = ?",
        [requestId],
        (err) => {
          if (err) return res.status(500).json({ message: "Approve failed", error: err });

          db.query(
            "SELECT id FROM roles WHERE normalized_name = ?",
            ["premium_user"],
            (err, roleResults) => {
              if (err) return res.status(500).json({ message: "Role lookup failed", error: err });

              if (roleResults.length === 0) {
                return res.status(404).json({ message: "Premium User role not found" });
              }

              const premiumRoleId = roleResults[0].id;

              db.query(
                "SELECT * FROM userroles WHERE user_id = ? AND role_id = ?",
                [userId, premiumRoleId],
                (err, existingRole) => {
                  if (err) return res.status(500).json({ message: "User role check failed", error: err });

                  if (existingRole.length > 0) {
                    return res.status(200).json({ message: "Request approved. User already has Premium User role." });
                  }

                  db.query(
                    "INSERT INTO userroles (user_id, role_id) VALUES (?, ?)",
                    [userId, premiumRoleId],
                    (err) => {
                      if (err) return res.status(500).json({ message: "Assign role failed", error: err });

                      res.status(200).json({ message: "Request approved and Premium User role assigned." });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
};

exports.denyRoadsideSubscription = (req, res) => {
  db.query(
    "UPDATE roadside_subscription_requests SET statusi = 'Denied' WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Deny failed", error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Request not found" });
      res.status(200).json({ message: "Request denied successfully" });
    }
  );
};

exports.deleteRoadsideSubscription = (req, res) => {
  db.query(
    "DELETE FROM roadside_subscription_requests WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Delete failed", error: err });
      if (result.affectedRows === 0) return res.status(404).json({ message: "Request not found" });
      res.status(200).json({ message: "Request deleted successfully" });
    }
  );
};