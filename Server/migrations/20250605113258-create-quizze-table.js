'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) { 
    await queryInterface.createTable("Quizzes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      quizzeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sectionId: {
        type: Sequelize.INTEGER,
        references: { model: "Sections", key: "id" },
      }, 
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      toTalScore: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      toTalQuestion: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Quizzes");
  }
};
