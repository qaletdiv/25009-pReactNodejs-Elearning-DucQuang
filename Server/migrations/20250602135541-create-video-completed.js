"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("VideoCompleteds", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      enrollmentId: {
        type: Sequelize.INTEGER,
        references: { model: "Enrollments", key: "id" },
      },
      videoId: {
        type: Sequelize.INTEGER,
        references: { model: "Videos", key: "id" },
      },
        createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
     await queryInterface.dropTable("VideoCompleteds");
  },
};
