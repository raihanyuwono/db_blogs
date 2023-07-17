const path = require("path");
const jwt = require("jsonwebtoken");
const messages = require("../services/messages");
require("dotenv").config({
    path: path.resolve("../.env"),
});

const KEY_JWT = process.env.KEY_JWT;

function mAuth(req, res, next) {
    try {
        let token = req.headers.authorization;
        if (!token) return res.status(400).json({ message: "Access denied" });

        token = token.split(" ")[1];
        if (!token || token == "null")
            return res.status(400).json({ message: "Unauthorized request" });

        const account = jwt.verify(token, KEY_JWT);

        if (!account)
            return res.status(500).json({ message: "Token has been expired" });

        req.account = account;
        next();
    } catch (error) {
        res.status(500).json({ message: "Please Try Again" });
    }
}

module.exports = mAuth;
