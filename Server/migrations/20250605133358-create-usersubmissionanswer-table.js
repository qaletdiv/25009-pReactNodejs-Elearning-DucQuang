'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("UserSubmissionAnswers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userSubmissionId: {
        type: Sequelize.INTEGER,
        references: { model: "UserSubmissions", key: "id" },
        allowNull: false,
      },
      questionId: {
        type: Sequelize.INTEGER,
        references: { model: "Questions", key: "id" },
        allowNull: false,
      },
      answerId: {
        type: Sequelize.INTEGER,
        references: { model: "Answers", key: "id" },
        allowNull: false,
      },
      isCorrect: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("UserSubmissionAnswers");
  }
};
