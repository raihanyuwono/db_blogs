"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("users", [
            {
                id:"f3c75ee0-da14-4870-ae32-5979915aac4a",
                username: "alpha",
                email: "alpha_zero@gmail.com",
                phone: "081122334455",
                password: "Qwerty123!",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "97a6ad1b-7813-41da-b801-5cfd64b5e1fa",
                username: "beta",
                email: "beta_zero@gmail.com",
                phone: "081122334466",
                password: "Qwerty123!",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "952bc1a2-1db3-4753-8b9d-335c5b5a490e",
                username: "zeta",
                email: "zeta_zero@gmail.com",
                phone: "081122334477",
                password: "Qwerty123!",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "68488815-5d3a-4695-b060-494f37a20d82",
                username: "omega",
                email: "omega_zero@gmail.com",
                phone: "081122334488",
                password: "Qwerty123!",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: "aadc2c5c-1e29-4854-946b-1c50f5fdf407",
                username: "delta",
                email: "delta_zero@gmail.com",
                phone: "081122334499",
                password: "Qwerty123!",
                created_at: new Date(),
                updated_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("users", null, {});
    },
};
