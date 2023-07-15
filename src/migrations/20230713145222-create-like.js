"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "likes",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                id_user: {
                    type: Sequelize.UUID,
                },
                id_blog: {
                    type: Sequelize.INTEGER,
                },
                created_at: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW,
                },
            },
            { timestapms: true, updatedAt: false, underscored: true }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("likes");
    },
};
