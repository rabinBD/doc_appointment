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
      DoctorName: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      Email:{
        type: Sequelize.STRING,
        unique: true,
      },
      Contact:{
        type: Sequelize.BIGINT,
        allowNull:false,
      },
      Speciality:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      Fees:{
        type: Sequelize.DOUBLE,
        allowNull:false,
      },
      Date:{
        type: Sequelize.DATEONLY,
        allowNull:false
      },
      Time:{
        type: Sequelize.TIME,
        allowNull:false
      },
      status:{
        type: Sequelize.INTEGER,
        allowNull:false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('doctors');
  }
};