'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('admin', {
      id_admin: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      nama_admin: {
        type: Sequelize.STRING
      },
      id_level: {
        type: Sequelize.INTEGER,
        allowNull: false, // arti tidak boleh null
        references: {
          model: "level", // names of table
          key: "id_level" // primaryKey of table
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admin');
  }
};

