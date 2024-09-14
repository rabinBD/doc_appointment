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
    Contact: {
      type: DataTypes.BIGINT,
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
    Date:{
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    Time:{
      type: DataTypes.TIME,
      allowNull:false
    },
    status:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'doctor',
    timestamps: false
  });
  return doctor;
};