'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    static associate(models) {
      Level.hasMany(models.Course, {
        foreignKey: "levelId",
        as: "Course",
      });
    }
  }
  Level.init({
    level: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Level',
    tableName: 'Levels', 
    timestamps: true
  });
  return Level;
};