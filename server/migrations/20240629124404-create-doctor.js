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
        allowNull:false
      },
      Email:{
        type: Sequelize.STRING,
        unique: true
      },
      Password:{
        type: Sequelize.STRING,
        allowNull:false
      },
      Contact:{
        type: Sequelize.BIGINT,
        allowNull:false
      },
      Gender:{
        type: Sequelize.ENUM('male','female','other'),
        allowNull:false
      },
      Speciality:{
        type: Sequelize.STRING,
        allowNull:false
      },
      Fees:{
        type: Sequelize.DOUBLE,
        allowNull:false
      },
      CreatedAt: {
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