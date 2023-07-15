"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.bulkInsert("categories", [
            { name: "Umum" },
            { name: "Olahraga" },
            { name: "Ekonomi" },
            { name: "Politik" },
            { name: "Bisnis" },
            { name: "Fiksi" },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("categories", null, {});
    },
};
