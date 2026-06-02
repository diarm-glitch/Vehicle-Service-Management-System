const db = require('../config/db');

exports.getAppointments = (req, res) => {
    db.query('SELECT * FROM appointments', (err, results) => {
        if (err) return res.status(500).json({message: "Database error", error: err});
        res.status(200).json(results);
    });
};

exports.getAppointmentById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM appointments WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({message: 'Database error', error: err});

        if (results.length === 0) {
            return res.status(404).json({message: 'Appointment not found'});
        }

        res.status(200).json(results[0]);
    });
};

exports.createAppointment = (req, res) => {
    const {vehicle_id, service_type_id, data, ora, statusi, shenime} = req.body;

    if (!vehicle_id || !service_type_id || !data || !ora) {
        return res.status(400).json({message: 'Please fill required fields'});
    }

    db.query(
        'INSERT INTO appointments (vehicle_id, service_type_id, data, ora, statusi, shenime) VALUES (?, ?, ?, ?, ?, ?)',
        [vehicle_id, service_type_id, data, ora, statusi || 'Pending', shenime],
        (err) => {
            if (err) return res.status(500).json({message: 'Creation failed', error: err});

            res.status(201).json({message: 'Appointment created successfully'});
        }
    );
};

exports.updateAppointment = (req, res) => {
    const id = req.params.id;
    const {vehicle_id, service_type_id, data, ora, statusi, shenime} = req.body;

    if (!vehicle_id || !service_type_id || !data || !ora) {
        return res.status(400).json({message: 'Please fill required fields'});
    }

    db.query(
        'UPDATE appointments SET vehicle_id=?, service_type_id=?, data=?, ora=?, statusi=?, shenime=? WHERE id=?',
        [vehicle_id, service_type_id, data, ora, statusi, shenime, id],
        (err, result) => {
            if (err) return res.status(500).json({message: 'Update failed', error: err});

            if (result.affectedRows === 0) {
                return res.status(404).json({message: 'Appointment not found'});
            }

            res.status(200).json({message: 'Appointment updated successfully'});
        }
    );
};

exports.deleteAppointment = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM appointments WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({message: 'Delete failed', error: err});

        if (result.affectedRows === 0) {
            return res.status(404).json({message: 'Appointment not found'});
        }

        res.status(200).json({message: 'Appointment deleted successfully'})
    });
};