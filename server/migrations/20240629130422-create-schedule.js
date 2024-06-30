'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctorId:{
        allowNull: false,
        references: {
          model: 'doctors', // This is the name of the table
          key: 'id', // This is the column name of the referenced table
          onUpdate: 'cascade'
        },
        type: Sequelize.INTEGER,
      },
      date:{
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      startTime:{
        allowNull: false,
        type: Sequelize.TIME
      },
      endTime:{
        allowNull: false,
        type: Sequelize.TIME
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('available','booked','unavailable'),
        defaultValue: 'unavailable'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('schedules');
  }
};