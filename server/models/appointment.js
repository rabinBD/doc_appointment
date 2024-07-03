'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  appointment.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users', // This is the name of the table
        key: 'id', // This is the column name of the referenced table
        onUpdate: 'cascade',
        onDelete: 'cascade',
      }
    },
    doctorId:{
      allowNull: false,
      references: {
        model: 'doctors', // This is the name of the table
        key: 'id', // This is the column name of the referenced table
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      type: DataTypes.INTEGER,
    },
    scheduleId:{
      allowNull: false,
      references: {
        model: 'schedules', // This is the name of the table
        key: 'id', // This is the column name of the referenced table
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      type: DataTypes.INTEGER
    },
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY
    },
    time:{
      allowNull: false,
      type: DataTypes.TIME
    },
    status:{
      allowNull: false,
      type: DataTypes.ENUM('pending','confirmed','cancelled') ,
      defaultValue: 'pending',
    },
    notes:{
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    
  }, {
    sequelize,
    modelName: 'appointment',
    timestamps: false
  });
  return appointment;
};