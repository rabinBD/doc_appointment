'use strict';

const { FOREIGNKEYS } = require('sequelize/lib/query-types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // This is the name of the table
          key: 'id', // This is the column name of the referenced table
          onUpdate: 'cascade'
        }
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
      scheduleId:{
        allowNull: false,
        references: {
          model: 'schedules', // This is the name of the table
          key: 'id', // This is the column name of the referenced table
          onUpdate: 'cascade'
        },
        type: Sequelize.INTEGER
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      time:{
        allowNull: false,
        type: Sequelize.TIME
      },
      status:{
        allowNull: false,
        type: Sequelize.ENUM('pending','confirmed','cancelled') ,
        defaultValue: 'pending'
      },
      notes:{
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('appointments');
  }
};