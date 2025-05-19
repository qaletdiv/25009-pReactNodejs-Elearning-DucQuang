"use strict";
const { Model, DataTypes } = require("sequelize");
const course = require("./course");

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(model) {
     
    }
  }
  Enrollment.init(
    {
      inProgess: {
        type: DataTypes.DECIMAL
      },
      status: {
        type: DataTypes.STRING  
      }, 
      userId: {
        type: DataTypes.INTEGER,
      }, 
      courseId: {
        type: DataTypes.INTEGER,
      }
    },
    {
      sequelize,
      modelName: "Enrollment",
      tableName: "Enrollments",
      timestamps: true,
    }
  );
  return Enrollment;
};
