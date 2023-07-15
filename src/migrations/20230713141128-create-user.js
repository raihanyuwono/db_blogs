"use strict";
const { v4: uuidv4 } = require("uuid");
const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "users",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                    defaultValue: uuidv4(),
                },
                username: {
                    allowNull: false,
                    type: Sequelize.STRING,
                    unique: true,
                },
                email: {
                    allowNull: false,
                    type: Sequelize.STRING,
                    unique: true,
                },
                phone: {
                    allowNull: false,
                    type: Sequelize.STRING,
                    unique: true,
                },
                password: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                avatar: {
                    type: Sequelize.STRING,
                },
                is_verified: {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                },
                created_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW,
                },
                updated_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW,
                },
            },
            { underscored: true }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
    },
};
