"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Sections", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sectionName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sourceId: {
        type: Sequelize.INTEGER,
        references: { model: "SectionSources", key: "id" },
      },
      courseId: {
        type: Sequelize.INTEGER,
        references: { model: "Courses", key: "id" },
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
    await queryInterface.dropTable('Sections');
  },
};
