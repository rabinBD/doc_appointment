'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    gender: {
      type: DataTypes.ENUM('male', 'female', 'other'),
      allowNull: false,
    },
    contact: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    createdAt: { 
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  }, {
    sequelize,
    modelName: 'user',
    timestamps: false
  });
  return user;
};

