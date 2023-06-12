'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartFoods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      food_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Food',
          key: 'id',
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CartFoods');
  }
};