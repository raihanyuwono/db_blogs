const path = require("path");
require("dotenv").config({
    path: path.resolve(__dirname, "../../.env"),
});


const DEV_USERNAME = process.env.DB_USERNAME;
const DEV_PASSWORD = process.env.DB_PASSWORD;
const DEV_DATABASE = process.env.DB_DATABASE;
const DEV_HOST = process.env.DB_HOST;

module.exports = {
    development: {
        username: DEV_USERNAME,
        password: DEV_PASSWORD,
        database: DEV_DATABASE,
        host: DEV_HOST,
        dialect: "mysql",
    },
    test: {
        username: DEV_USERNAME,
        password: DEV_PASSWORD,
        database: DEV_DATABASE,
        host: DEV_HOST,
        dialect: "mysql",
    },
    production: {
        username: DEV_USERNAME,
        password: DEV_PASSWORD,
        database: DEV_DATABASE,
        host: DEV_HOST,
        dialect: "mysql",
    },
};
