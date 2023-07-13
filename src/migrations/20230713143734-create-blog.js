"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("blogs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            content: {
                allowNull: false,
                type: Sequelize.STRING(500),
            },
            keywords: {
                type: Sequelize.STRING,
            },
            url_img: {
                type: Sequelize.TEXT,
            },
            url_video: {
                type: Sequelize.TEXT,
            },
            id_user: {
                allowNull: false,
                type: Sequelize.UUID,
            },
            id_category: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            id_country: {
                type: Sequelize.INTEGER,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: DataTypes.NOW,
            },
            modified_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: DataTypes.NOW,
            },
            createdAt: false,
            updatedAt: false,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("blogs");
    },
};
