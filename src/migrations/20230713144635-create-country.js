"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            "countries",
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                name: {
                    type: Sequelize.STRING,
                },
                code: {
                    type: Sequelize.STRING(3),
                },
            },
            { timestamps: false }
        );
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("countries");
    },
};
