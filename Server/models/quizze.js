"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Quizze extends Model {
    static associate(model) {
      Quizze.belongsTo(model.Section, {
        foreignKey: "sectionId",
        as: "section",
      });
      Quizze.hasMany(model.Question, {
        foreignKey: "quizzeId",
        as: "questions",
      });
      Quizze.belongsToMany(model.User, {
        through: model.UserSubmission,
        foreignKey: "quizzeId",
        otherKey: "userId",
        as: "userSubmissions",
      });
    }
  }
  Quizze.init(
    {
      quizzeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sectionId: {
        type: DataTypes.INTEGER,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      toTalScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      toTalQuestion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Quizze",
      tableName: "Quizzes",
      timestamps: true,
    }
  );
  return Quizze;
};
