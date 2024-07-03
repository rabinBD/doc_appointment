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
    doctorName: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false
    },
    contact: {
      type: DataTypes.BIGINT,
      allowNull:false
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull:false
    },
    speciality: {
      type: DataTypes.STRING,
      allowNull:false
    },
    fees:{
      type: DataTypes.DOUBLE,
      allowNull:false
    },
    createdAt: {
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