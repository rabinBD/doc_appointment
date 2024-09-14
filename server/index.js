require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

// Middleware setup
app.use(express.json());
app.use(morgan('dev'));

// CORS configuration
const corsOptions = {
  origin: ['http://localhost','http://127.0.0.1:3001', 'http://10.0.2.2'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Route setup
app.use('/api/medplus/patient', require('./routes/userroutes'));
app.use('/api/medplus/admin', require('./routes/adminRoute'));
app.use('/api/medplus/doctor', require('./routes/doctorRoute'));
app.use('/api/medplus/patient/appointment', require('./routes/appointmentRoute'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

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
