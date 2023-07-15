"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.bulkInsert("countries", [
            {
                code: "IDN",
                name: "Indonesia",
            },
            {
                code: "JPN",
                name: "Japan",
            },
            {
                code: "USA",
                name: "United States of America",
            },
            {
                code: "GBR",
                name: "United Kigdom of Great Britain and Northen Ireland",
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("countries", null, {});
    },
};
