const { schedule, appointment, notification } = require('../models')

//creating an appointment
const Issueappointment = async (req, res) => {
    try {
        const { userId, doctorId, scheduleId, date, time, notes } = req.body;
        let createdAt = new Date()
        if (!date || !time || !notes) {
            return res.status(400).send({
                success: false,
                message: 'Provide all information'
            })
        }

        const IsUserExist = await appointment.findOne({userId: userId})
        if(IsUserExist){
            return res.status(200).send({
                success:false,
                message:'Your appointment has been placed already'
            })
        }

        //check for the schedule
        const check = await schedule.findOne({ where: { id: scheduleId, doctorId: doctorId } })
        if (!check) {
            return res.status(404).send({message:'Schedule not found'});
        }

        //if schedule is free create an appointment
        const user = await appointment.create({ userId, doctorId, scheduleId, date, time, status: 'pending', notes, createdAt })
        if (!user) {
            return res.status(400).send({
                message: 'insert error occured'
            })
        }

        //update the schedule concurrently for the data integrity
        const updateSchedule = await schedule.update(
            { status: 'booked' },
            { where: { status : available, id: scheduleId} }
        )
        if (!updateSchedule) {
            return res.status(400).send({ message: 'update error occured' })
        }

        //if all process true appointment registered
        return res.status(200).send({
            success: true,
            message: 'appointment registered successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: 'Error Occured' +error
        })
    }
}

//approved or rejected by doctor
const doctorResponse = async (req, res) => {
    try {

        const { status, appointmentId, doctorId } = req.body;
        if (!status) {
            return res.status(400).send({
                success: false,
                message: 'Provide status'
            })
        }
        const result = await appointment.update({status: status},
            {where:{id: appointmentId, doctorId: doctorId}}
        )

        if (!result) {
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


module.exports = { Issueappointment, doctorResponse };
