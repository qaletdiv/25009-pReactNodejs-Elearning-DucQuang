'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable("Questions", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    questionText: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    quizzeId: {
      type: Sequelize.INTEGER,
      references: { model: "Quizzes", key: "id" },
    },
    questionScore: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    questionType: {
      type: Sequelize.STRING,
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
    await queryInterface.dropTable("Questions");
  }
};
