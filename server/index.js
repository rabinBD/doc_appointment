require('dotenv').config();
const express = require('express');
const { sequelize } = require('./models');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server and connect to the database
app.listen(port, async () => {
  console.log(`Server running on port ${port}`);
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

module.exports = app;
