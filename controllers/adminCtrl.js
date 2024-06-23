const db = require("../config/db");

//for admin login
const logCtrl = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Provide all information'
            })
        }
        const [refemail] = await db.query('SELECT * from admin_tb WHERE email = ?', [email]);
        if (!refemail[0]) {
            return res.status(400).send({
                success: false,
                message: 'Invalid credentials'
            })
        }
        const admin = refemail[0];
        if (admin.password === password) {
            return res.status(200).send({
                success: true,
                message: 'Admin logged Successfully'
            })
        } else {
            res.status(500).send({
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
const dochomectrl = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM doc_tb')
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'no record found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'all record!',
            total: data[0].length,
            data: data[0]
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
const patienthomectrl = async (req, res) => {
    try {
        const data = await db.query('SELECT * FROM user_tb')
        if (!data) {
            return res.status(400).send({
                success: false,
                message: 'no record found'
            })
        }
        res.status(200).send({
            success: true,
            message: 'all record!',
            total: data[0].length,
            data: data[0]
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
const addDoc = async (req, res) => {
    try {
        const { Dr_name, email, contact, specialities } = req.body;
        if (!Dr_name || !email || !contact || !specialities) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all the details'
            })
        }
        const [exist_doc] = await db.query('SELECT * FROM doc_tb WHERE email = ?', [email]);
        if (exist_doc.length > 0) {
            return res.status(401).send({
                success: false,
                message: 'doctor registered already'
            });
        }
        const doc = await db.query('INSERT INTO doc_tb(Dr_name,email,contact, specialities) VALUES(?,?,?,?)', [Dr_name, email, contact, specialities]);
        if (!doc) {
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
const delDoc = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: 'Please provide valid ID'
            })
        }
        await db.query('DELETE FROM doc_tb WHERE D_id = ?', [id])
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

module.exports = { logCtrl, dochomectrl, patienthomectrl, addDoc, delDoc }
