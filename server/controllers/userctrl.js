const { user, schedule } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklist = require("../config/blacklist")
const dotenv = require('dotenv');
dotenv.config();//to load .env file

//signup controller
const usersignup = async (req, res) => {
    try {
        const { name, email, password: plainPassword, gender, contact, dateOfBirth } = req.body;
        const createdAt = new Date();

        if (!name || !email || !plainPassword || !gender || !contact || !dateOfBirth) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all required information'
            });
        }

        const exist_user = await user.findOne({ where: { email } });
        if (exist_user) {
            return res.status(200).send({
                success: false,
                message: 'User already signed up, please login'
            });
        }

        // Using bcrypt for encryption of password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(plainPassword, salt);

        const NewUser = await user.create({ name, email, password: hash, gender, contact, dateOfBirth, createdAt });
        if (!NewUser) {
            return res.status(500).send({
                success: false,
                message: 'Error occurred during signup'
            });
        }

        res.status(201).send({
            success: true,
            message: 'New user created in MedPlus'
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Signup error occurred',
            error: error.message
        });
    }
};

//login controller
const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Get the user by email
        const existingUser = await user.findOne({ where: { email: email } });

        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: 'User is not signed up'
            });
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Password'
            });
        }

        const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).send({
            success: true,
            message: 'Login Success',
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error in Login: ${error.message}`
        });
    }
};

//authorization of patient through token // for testing purpose
const authctrl = async (req, res) => {
    try {
        const IsUser = await user.findAll({ where: { id: req.body.id } })
        if (!IsUser) {
            return res.status(200).send({
                success: false,
                message: 'user not found'
            })
        } else {
            res.status(200).send({
                success: true,
                data: IsUser[0]
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error
        })
    }
}

//logout controller
const logoutuser = async (req, res) => {
    const authHeader = await req.headers['authorization'];
    const token = await authHeader.split(" ")[1];

    // Add token to blacklist
    blacklist.push(token);

    res.status(200).send({
        success: true,
        message: 'Logged out successfully'
    }); res.redirect('/login');
}

//delete user's profile controller
const deleteUser = async (req, res) => {
    try {
        const p_id = req.params.id;
        if (!p_id) {
            return res.status(404).send({
                success: false,
                message: 'Please provide valid ID'
            })
        }
        await user.destroy({ where: { id: p_id } })
        res.status(200).send({
            success: true,
            messge: 'Patient profile Deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            mesage: 'Error in deleting profile'
        })
    }
}

const getDoctorSchedule = async (req, res) => {
    try {
        //finding the user
        const p_id = req.params.id;
        const { scheduleId, doctorId } = req.body;
        if (!p_id) {
            return res.status(404).send({
                success: false,
                message: 'Please provide valid ID'
            })
        }
        const IsUser = await user.findOne({ where: { id: p_id } })
        if (!IsUser) {
            return res.status(404).send({ message: 'something went wrong!' })
        }

        //fething the schdule data to user
        const getDoctor = await schedule.findAll({ where: { id: scheduleId, doctorId: doctorId } })
        if (!getDoctor) {
            return res.status(404).send({ message: 'error in getting doctor' })
        }
        return res.status(200).send({
            success: true,
            message: `Result for the ID ${doctorId}`,
            data: getDoctor,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            mesage: ' server error ' + error
        })
    }
}

module.exports = { userlogin, usersignup, authctrl, deleteUser, logoutuser, getDoctorSchedule };