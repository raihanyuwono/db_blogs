"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        queryInterface.bulkInsert("likes", [
            {
                id_user: "68488815-5d3a-4695-b060-494f37a20d82",
                id_blog: "1",
                created_at: new Date(),
            },
            {
                id_user: "68488815-5d3a-4695-b060-494f37a20d82",
                id_blog: "2",
                created_at: new Date(),
            },
            {
                id_user: "f3c75ee0-da14-4870-ae32-5979915aac4a",
                id_blog: "1",
                created_at: new Date(),
            },
            {
                id_user: "aadc2c5c-1e29-4854-946b-1c50f5fdf407",
                id_blog: "4",
                created_at: new Date(),
            },
            {
                id_user: "97a6ad1b-7813-41da-b801-5cfd64b5e1fa",
                id_blog: "3",
                created_at: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete("likes", null, {});
    },
};
