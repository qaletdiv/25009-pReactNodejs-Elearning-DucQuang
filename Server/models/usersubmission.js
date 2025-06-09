"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserSubmission extends Model {
    static associate(model) {
      UserSubmission.hasMany(model.UserSubmissionAnswer, {
        foreignKey: "userSubmissionId",
        as: "userSubmissionAnswers",
      });
    }
  }
  UserSubmission.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
        allowNull: false,
      },
      quizzeId: {
        type: DataTypes.INTEGER,
        references: { model: "Quizzes", key: "id" },
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      correctCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "UserSubmission",
      tableName: "UserSubmissions",
      timestamps: true,
    }
  );
  return UserSubmission;
};
