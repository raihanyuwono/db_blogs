const path = require("path");
const db = require("./models");
const express = require("express");
const { rAuth, rBlog, rProfile } = require("./routes");

require("dotenv").config({
    path: path.resolve(__dirname, "../.env"),
});


const PORT = process.env.PORT || 8000;
const api = express();

api.use(express.json());

api.use("/auth", rAuth);
api.use("/blogs", rBlog);
api.use("/profile", rProfile);

api.listen(PORT, () => {
    console.log(`Server Running at localhost post ${PORT}`);
});
