const path = require("path");
const dotenv = require("dotenv");
const db = require("./models");
const express = require("express");
const { authRouter, profileRouter, blogRouter } = require("./routes");

dotenv.config({
    path: path.resolve(__dirname, "../.env"),
});

const PORT = process.env.PORT || 8000;
const api = express();

api.use(express.json());

api.use("/auth", authRouter);
api.use("/profile", profileRouter);
api.use("/blogs", blogRouter);

api.listen(PORT, () => {
    console.log(`Server Running at localhost post ${PORT}`);
});
