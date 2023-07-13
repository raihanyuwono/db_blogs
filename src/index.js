const path = require("path");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});

const PORT = process.env.PORT || 8000;
const api = express();

api.listen(PORT, () => {
    console.log(`Server Running at localhost post ${PORT}`);
});