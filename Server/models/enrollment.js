"use strict";
const { Model, DataTypes } = require("sequelize");
const course = require("./course");

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(model) {
      Enrollment.belongsToMany(model.Video, {
        through: model.VideoCompleted,
        foreignKey: "enrollmentId",
        otherKey: "videoId",
        as: "completedVideos",
      })
    }
  }
  Enrollment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
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
