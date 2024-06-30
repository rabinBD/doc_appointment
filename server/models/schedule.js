'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  schedule.init({
    doctorId:{type:DataTypes.INTEGER,allowNull:false},
    date: {type:DataTypes.DATEONLY,allowNull:false},
    startTime: {type:DataTypes.TIME,allowNull:false},
    endTime: {type:DataTypes.TIME,allowNull:false},
    createdAt: {type:DataTypes.DATE,allowNull:false},
    status: {type:DataTypes.ENUM('available','booked','unavailable'),allowNull:false},
  }, {
    sequelize,
    modelName: 'schedule',
    TIMESTAMP: false
  });
  return schedule;
};