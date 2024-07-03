'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other'),
        allowNull: false,
      },
      contact: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
        dateOfBirth: {
          type: Sequelize.DATEONLY,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: sequelize.NOW,
        },
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};