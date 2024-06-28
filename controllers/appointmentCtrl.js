const db = require("../config/db");

//creating an appointment
const appointment = async (req, res) => {
    try {
        const { id, D_id, s_id, date_, _time, notes } = req.body;
        if (!id || !D_id || !s_id || !date_ || !_time || !notes) {
            return res.status(400).send({
                success: false,
                message: 'Provide all information'
            })
        }

        //start transaction
        //  await db.beginTransaction(async (err) => {
        //     if (err) {
        //         return res.status(400).send({ message: 'transaction error' + err })
        //     }
            const user = await db.query('INSERT INTO appointment_tb (id, D_id, s_id, date_, _time, status, notes) VALUES(?,?,?,?,?,?,?)', [id, D_id, s_id, date_, _time, 'pending', notes]);
            if (!user) {
                return res.rollback((err) => {
                    res.status(400).send({ message: 'insert error occured' + err })
                })
            }

            const user1 = await db.query('UPDATE schedule_tb SET status = ? WHERE s_id = ?', ['booked', s_id])
            if (!user1) {
                return res.rollback((err) => {
                    res.status(400).send({ message: 'update error occured' + err })
                })
            }

            //commit transaction
            // await db.commit((err) => {
            //     if (err) {
            //         return db.rollback(() => {
            //             res.status(500).json({ error: 'Commit error: ' + err.message });
            //         });
            //     }
                return res.status(200).send({
                    success: true,
                    message: 'appointment registered successfully'
                })

        //     })
        // })
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: 'Error Occured' +error
        })
    }
}

//approved or rejected by doctor
const doc_res = async (req, res) => {
    try {

        const { status,ap_id,D_id  } = req.body;
        if (!D_id || !status || !ap_id) {
            return res.status(400).send({
                success: false,
                message: 'Provide all information'
            })
        }
        const doc = await db.query('UPDATE appointment_tb SET status = ? WHERE ap_id = ? AND D_id = ?', [  status,ap_id,D_id ]);

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


//approved or rejected by admin
// const admin_res = async (req, res) => {
//     try {
//         const { status, ap_id } = req.body;
//         if (!status) {
//             return res.status(400).send({
//                 success: false,
//                 message: 'please choose status'
//             })
//         }
//         const doc = await db.query('UPDATE appointment_tb SET status = ? WHERE ap_id = ? ', [status, ap_id]);

//         if (!doc) {
//             return res.status(400).send({
//                 success: false,
//                 messsage: 'Appointment not found or not authorized'
//             })
//         }
//         return res.status(200).send({
//             success: true,
//             message: 'Appointment status updated '
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error Occured'
//         })
//     }
// }

module.exports = { appointment, doc_res };
