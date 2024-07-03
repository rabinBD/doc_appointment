'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('doctors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      doctorName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email:{
        type: Sequelize.STRING,
        unique: true
      },
      password:{
        type: Sequelize.STRING,
        allowNull:false
      },
      contact:{
        type: Sequelize.BIGINT,
        allowNull:false
      },
      gender:{
        type: Sequelize.ENUM('male','female','other'),
        allowNull:false
      },
      speciality:{
        type: Sequelize.STRING,
        allowNull:false
      },
      fees:{
        type: Sequelize.DOUBLE,
        allowNull:false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull:false,
        defaultValue:Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('doctors');
  }
};