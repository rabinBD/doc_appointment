const db = require("../config/db");
// const nodemailer = require("nodemailer")

//creating an appointment
const appointment = async (req, res) => {
    try {
        const { id } = req.user;
        const { D_id, s_id, date_, _time, notes } = req.body;
        if (!id || !D_id || !s_id || !date_ || !_time || !notes) {
            return res.status(400).send({
                success: false,
                message: 'Provide all information'
            })
        }
        
        const check = await db.query('SELECT * FROM schedule_tb WHERE s_id = ? AND D_id = ?', [s_id, D_id])
        if (!check) {
            return res.status(500).send(error);
        }
        if (check.length === 0) {
            return res.status(404).send('Schedule not found');
        }

        const user = await db.query('INSERT INTO appointment_tb (id, D_id, s_id, date_, _time, status, notes) VALUES(?,?,?,?,?,?,?)', [id, D_id, s_id, date_, _time, 'pending', notes]);
        if (!user) {
            return res.rollback((err) => {
                res.status(400).send({ message: 'insert error occured' + err })
            })
        }

        // Send notification to doctor
        sendNotification(D_id, `New appointment request for ${date_} at ${_time}`);

        const user1 = await db.query('UPDATE schedule_tb SET status = ? WHERE s_id = ?', ['booked', s_id])
        if (!user1) {
            return res.rollback((err) => {
                res.status(400).send({ message: 'update error occured' + err })
            })
        }
        return res.status(200).send({
            success: true,
            message: 'appointment registered successfully'
        })

        // Function to send notification
        function sendNotification(D_id, message) {
            db.query('INSERT INTO Notifications (doctor_id, message) VALUES (?, ?)', [D_id, message], (error, results) => {
                if (error) console.error(error);
                else console.log('Notification sent');
            });
        }
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: 'Error Occured' + error
        })
    }
}

//approved or rejected by doctor
const doctorResponse = async (req, res) => {
    try {

        const { status, ap_id, D_id } = req.body;
        if (!D_id || !status || !ap_id) {
            return res.status(400).send({
                success: false,
                message: 'Provide all information'
            })
        }
        const doc = await db.query('UPDATE appointment_tb SET status = ? WHERE ap_id = ? AND D_id = ?', [status, ap_id, D_id]);

        if (!doc) {
            return res.status(400).send({
                success: false,
                messsage: 'Appointment not found or not authorized'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Appointment status updated by doctor'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Occured'
        })
    }
}


module.exports = { appointment, doctorResponse};
