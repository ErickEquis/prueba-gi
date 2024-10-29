'use strict';
const config = require('../config/config');
const schema = config.database.schema;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes, Sequelize) {
    await queryInterface.createTable('ca_tasks', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
      {
        timestamps: false,
        charset: 'UTF8',
        schema: schema
      }
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
