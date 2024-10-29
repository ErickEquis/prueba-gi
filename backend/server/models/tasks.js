'use strict'

const config = require('../config/config');

module.exports = (sequelize, DataTypes, Deferrable) => {
    const schema = config.database.schema;

    let ca_tasks = sequelize.define(
        'ca_tasks',
        {
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
    );

    return ca_tasks;
};