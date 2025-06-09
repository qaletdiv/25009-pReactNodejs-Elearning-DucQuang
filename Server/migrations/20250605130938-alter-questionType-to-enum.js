"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Questions", "questionType", {
      type: Sequelize.ENUM("multiple-choice", "true-false", "short-answer"),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Questions", "questionType", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Questions_questionType";'
    );
  },
};
