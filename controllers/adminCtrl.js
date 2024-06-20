const db = require("../config/db");

const logCtrl = async (req, res) => {
    try {
        const { email, password} = req.body;
        if(!email || !password){
            return res.status(400).send({
                success:false,
                message:'Provide all information'
            })
        }
        const [refemail] = await db.query('SELECT * from admin_tb WHERE email = ?', [email]);
        if(!refemail[0]){
            return res.status(400).send({
                success:false,
                message:'Invalid credentials'
            })
        }
        const admin = refemail[0];
        if(admin.password === password){
            return res.status(200).send({
                success:true,
                message:'Admin logged Successfully'
            })
        }else{
            res.status(500).send({
                success:false,
                message:'You are not Admin'
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

module.exports = { logCtrl }
