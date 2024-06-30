const db = require("../config/db");

//doctor login in their page
const doctorloginCtrl = async (req, res) => {
    try {
        const {email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Provide all information'
            })
        }
        const [refemail] = await db.query('SELECT * from doc_tb WHERE email = ?', [email]);
        if (!refemail[0]) {
            return res.status(400).send({
                success: false,
                message: 'Invalid credentials'
            })
        }
        const doctor = refemail[0];
        if (doctor.password === password) {
            return res.status(200).send({
                success: true,
                message: 'doctor logged Successfully'
            })
        } else {
            res.status(400).send({
                success: false,
                message: 'You are unauthorized to access'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: 'Error occured'
        })
    }
}

//doctor manages their schedule
const schedule = async (req, res) => {
    try {
        const {D_id, date_, start_time, end_time} = req.body;
        if (!D_id || !date_ || !start_time || !end_time) {
            return res.status(400).send({
                success: false, 
                message: 'provide all schedule data'
            })
        }
        const user = await db.query('INSERT INTO schedule_tb(D_id, date_, start_time, end_time, status) VALUES(?,?,?,?,?)',[D_id, date_, start_time, end_time, "available"]);
        if(!user){
            return res.status(400).send({
                success:false,
                message:'unable to load schedule'
            })
        }else{
            return res.status(200).send({
                success:true,
                message:'schedule uploaded'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error Occured'
        })
    }
}

module.exports = {schedule, doctorloginCtrl }