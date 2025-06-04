"use strict";
const { Model, DataTypes } = require("sequelize");
const course = require("./course");

module.exports = (sequelize, DataTypes) => {
  class VideoCompleted extends Model {
    static associate(model) {
        
    }
  }
  VideoCompleted.init(
    {
      enrollmentId: {
        type: DataTypes.INTEGER,
      },
      videoId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "VideoCompleted",
      tableName: "VideoCompleteds",
      timestamps: true,
    }
  );
  return VideoCompleted;
};
