"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    static associate(model) {
      Video.belongsTo(model.Section, {
        foreignKey: "sectionId",
        as: "section",
      });
      Video.belongsToMany(model.Enrollment, {
        through: model.VideoCompleted,
        foreignKey: "videoId",
        otherKey: "enrollmentId",
        as: "completedByUsers",
      });
    }
  }
  Video.init(
    {
      videoName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sectionId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Video",
      tableName: "Videos",
      timestamps: true,
    }
  );
  return Video;
};
