"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    static associate(model) {
      Answer.belongsTo(model.Question, {
        foreignKey: "questionId",
        as: "question",
      });
      Answer.hasMany(model.UserSubmissionAnswer, {
        foreignKey: "answerId",
        as: "userSubmissionAnswers",
      });
    }
  }
  Answer.init(
    {
      questionId: {
        type: DataTypes.INTEGER,
        references: { model: "Questions", key: "id" },
        allowNull: false,
      },
      answerText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Answer",
      tableName: "Answers",
      timestamps: true,
    }
  );
  return Answer;
};
