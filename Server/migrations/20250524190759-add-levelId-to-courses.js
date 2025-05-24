'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Courses', 'levelId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Levels',
        key: 'id'
      },
    }, {
      after: 'categoryId'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Courses', 'levelId');
  }
};
