"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    static associate(model) {
      Question.belongsTo(model.Quizze, {
        foreignKey: "quizzeId",
        as: "quizze",
      });
      Question.hasMany(model.Answer, {
        foreignKey: "questionId",
        as: "answers",
      });
      Question.hasMany(model.UserSubmissionAnswer, {
        foreignKey: "questionId",
        as: "userSubmissionAnswers",
      });
    }
  }
  Question.init(
    {
      questionText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quizzeId: {
        type: DataTypes.INTEGER,
      },
      questionScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      questionType: {
        type: DataTypes.ENUM("multiple-choice", "true-false", "short-answer"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Question",
      tableName: "Questions",
      timestamps: true,
    }
  );
  return Question;
};
