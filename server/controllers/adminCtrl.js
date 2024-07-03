const { admin, doctor, user } = require("../models")

//for admin login
const loginCtrl = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Provide all information'
            })
        }

        const adminCredential = await admin.findOne({ where: { email: email } })
        if (!adminCredential) {
            return res.status(400).send({
                success: false,
                message: 'Invalid credentials'
            })
        }
        else if (adminCredential.password === password) {
            return res.status(200).send({
                success: true,
                message: 'Admin logged Successfully'
            })
        } else {
            res.status(400).send({
                success: false,
                message: 'You are not Admin'
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

//doctor page through admin's side
const doctorHomeCtrl = async (req, res) => {
    try {
        const data = await doctor.findAll({})
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'no record found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'all record!',
            total: data.length,
            data: data,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error occur'
        })
    }
}

//patient page through admin's side
const patientHomeCtrl = async (req, res) => {
    try {
        const data = await user.findAll({})
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'no record found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'all record!',
            total: data.length,
            data: data,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'error occur'
        })
    }
}

//add new doctors in the system
const addDoctor = async (req, res) => {
    try {
        const { doctorName, email, password, contact, gender, speciality, fees } = req.body;
        const createdAt = new Date()
        if (!doctorName || !email || !password || !contact || !gender || !speciality || !fees) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all the details'
            })
        }

        const doctorExist = await doctor.findOne({where:{email: email}})
        if (doctorExist) {
            return res.status(401).send({
                success: false,
                message: 'doctor registered already'
            });
        }
        const doctorRegister = await doctor.create({doctorName, email, password, contact, gender, speciality,fees,createdAt})
        if (!doctorRegister) {
            return res.status(400).send({
                success: false,
                message: 'error!'
            })
        }
        res.status(200).send({
            success: true,
            message: 'Doctor Added Successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in adding doctor'
        })
    }
}

//delete existing doctor from system
const deleteDoctor = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'Please provide valid ID'
            })
        }
        await doctor.destroy({where:{id: id}})
        res.status(200).send({
            success: true,
            messge: 'Doctor profile Deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            mesage: 'Error in deleting profile'
        })
    }
}

module.exports = { loginCtrl, doctorHomeCtrl, patientHomeCtrl, addDoctor, deleteDoctor }
