const jwt = require('jsonwebtoken');
const blacklist = require('../config/blacklist');

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).send({
                success: false,
                message: 'Authorization header missing'
            });
        }
        
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'Token missing'
            });
        }

        if (blacklist.includes(token)) {
            return res.status(401).send({
                success: false,
                message: 'Token has been logged out'
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'Auth Failed',
                    error: err.message
                });
            } else {
                req.body.id = decoded.id;
                next();
            }
        });

    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: 'Authorization Failed',
            error: error.message
        });
    }
};
