'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  doctor.init({
    DoctorName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    Email: {
      type: DataTypes.STRING,
      unique: true
    },
    Password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    Contact: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    Gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull:false
    },
    Speciality: {
      type: DataTypes.STRING,
      allowNull:false
    },
    Fees:{
      type: DataTypes.DOUBLE,
      allowNull:false
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull:false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'doctor',
    timestamps: false
  });
  return doctor;
};