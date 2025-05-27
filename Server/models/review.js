"use strict";
const { Model, DataTypes } = require("sequelize");
const course = require("./course");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(model) {
        Review.belongsTo(model.Course, {
          foreignKey: "courseId",
          as: "course",
        });
        Review.belongsTo(model.User, {
          foreignKey: "userId",
          as: "user",
        });
    }
  }
  Review.init(
    {
      rating: {
        type: DataTypes.DECIMAL(5, 2),
      },
      comment: {
        type: DataTypes.TEXT  
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
      modelName: "Review",
      tableName: "Reviews",
      timestamps: true,
    }
  );
  return Review;
};
