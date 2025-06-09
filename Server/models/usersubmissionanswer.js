"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserSubmissionAnswer extends Model {
    static associate(model) {
      UserSubmissionAnswer.belongsTo(model.UserSubmission, {
        foreignKey: "userSubmissionId",
        as: "submission",
      });

      UserSubmissionAnswer.belongsTo(model.Question, {
        foreignKey: "questionId",
        as: "question",
      });

      UserSubmissionAnswer.belongsTo(model.Answer, {
        foreignKey: "answerId",
        as: "answer",
      });
    }
  }
  UserSubmissionAnswer.init(
    {
      userSubmissionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      answerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserSubmissionAnswer",
      tableName: "UserSubmissionAnswers",
      timestamps: true,
    }
  );
  return UserSubmissionAnswer;
};
