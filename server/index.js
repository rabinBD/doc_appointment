require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const { sequelize } = require('./models');

const app = express();

//initiating middleware for server
app.use(express.json());
app.use(morgan('dev')),
app.use(cors());

//router setup 
app.use('/api/medplus/patient', require('./routes/userRoutes'));
app.use('/api/medplus/admin', require('./routes/adminRoute'));
app.use('/api/medplus/doctor', require('./routes/doctorRoute'));
app.use('/api/medplus/appointment', require('./routes/appointmentRoute'));

// Start the server and connect to the database
const port = process.env.PORT || 3000;
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

// module.exports = app;
 