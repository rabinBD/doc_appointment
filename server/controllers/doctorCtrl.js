const { doctor, schedule } = require('../models')

//doctor login in their page
const doctorloginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Provide all information'
            })
        }

        //verify the doctor
        const checkEmail = await doctor.findOne({ where: { email: email } })
        if (!checkEmail) {
            return res.status(400).send({
                success: false,
                message: 'Invalid credentials'
            })
        }
        if (checkEmail.password === password) {
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
const scheduleManage = async (req, res) => {
    try {
        const { doctorId, date, startTime, endTime, status } = req.body;
        const createdAt = new Date()
        if ( !date || !startTime || !endTime || !status) {
            return res.status(400).send({
                success: false,
                message: 'provide all schedule data'
            })
        }
        const insertSchedule = await schedule.create({doctorId, date, startTime, endTime,createdAt,status})
        if (!insertSchedule) {
            return res.status(400).send({
                success: false,
                message: 'unable to load schedule'
            })
        } else {
            return res.status(200).send({
                success: true,
                message: 'schedule uploaded'
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

module.exports = { scheduleManage, doctorloginCtrl }