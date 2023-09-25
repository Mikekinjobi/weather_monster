'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Temperatures', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      city_id: {
        type: Sequelize.INTEGER
      },
      max: {
        type: Sequelize.INTEGER
      },
      min: {
        type: Sequelize.INTEGER
      },
      timestamp: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Temperatures');
  }
};