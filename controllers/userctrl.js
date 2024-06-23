const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklist = require("../config/blacklist")
const dotenv = require('dotenv');
dotenv.config();//to load .env file


//signup controller
const usersignup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Provide all information'
            })
        }

        const [exist_user] = await db.query('SELECT * FROM user_tb WHERE email = ?', [email]);
        if (exist_user.length > 0) {
            return res.status(401).send({
                success: false,
                message: 'User signup already'
            });
        }
        //using bcrypt for incyption of password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        req.body.password = hash;

        const data = await db.query(`INSERT INTO user_tb(username,email,password) VALUES(?,?,?)`, [username, email, hash])
        if (!data) {
            return res.status(404).send({
                success: false,
                message: 'Error occured during signup'
            })
        }
        res.status(201).send({
            success: true,
            message: 'New user created in MedPlus'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'signup error occured',
            error
        })
    }
}

//login controller
const userlogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        //to get the user by email
        const [userResult] = await db.query('SELECT * FROM user_tb WHERE email = ?', [email]);

        if (userResult.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'User is not signed up'
            });
        }

        const user = userResult[0];

        // Compare the entered password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).send({
            success: true,
            message: 'Login Success',
            token: token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Error in Login : ${error.message}`
        })
    }
}

//authorization of patient through token 
const authctrl = async (req, res) => {
    try {
        const user = await db.query('SELECT * FROM user_tb WHERE id = ?', [req.body.id]);
        if (!user) {
            return res.status(200).send({
                success: false,
                message: 'user not found'
            })
        } else {
            res.status(200).send({
                success: true,
                data: user[0]
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

//reset password controller
const logoutuser = async(req, res) => {
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
const deluser = async (req, res) => {
    try {
        const p_id = req.params.id;
        if (!p_id) {
            return res.status(404).send({
                success: false,
                message: 'Please provide valid ID'
            })
        }
        await db.query('DELETE FROM user_tb WHERE id = ?', [p_id])
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


module.exports = {userlogin, usersignup, authctrl, deluser, logoutuser};