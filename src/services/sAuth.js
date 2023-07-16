const path = require("path");
const messages = require("./messages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({
    path: path.resolve("../.env"),
});

const db = require("../models");
const { Op } = require("sequelize");
const users = db["user"];
const KEY_JWT = process.env.KEY_JWT;
const VERIFY_MESSAGE = "Please check your email to verify your account";

db.sequelize.sync({ alter: true });

async function updateAccount(id, username, password, message) {
    return await db.sequelize.transcation(async (t) => {
        const result = await users.update(
            { username, password },
            { where: { id }, transcation: t }
        );
        return messages.success(message, result);
    });
}

async function createAccount(username, email, phone, password) {
    console.log(username, email, phone, password);
    return await db.sequelize.transaction(async (t) => {
        console.log("OK");
        const result = await users.create(
            {
                username,
                email,
                phone,
                password,
            },
            { transcation: t }
        );
        return messages.success(VERIFY_MESSAGE, result);
    });
}

async function register(username, email, phone, password) {
    if (!username || !email || !phone || !password)
        messages.errorClient("Please fill all the data");

    const account = await users.findOne({
        where: { [Op.or]: [{ username }, { email }, { phone }] },
    });
    if (account) return messages.errorServer("Account already exist");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // if (account["is_verified"])
    //     return updateAccount(
    //         account["id"],
    //         username,
    //         phone,
    //         hashPassword,
    //         VERIFY_MESSAGE
    //     );

    return await createAccount(username, email, phone, hashPassword);
}

async function verify(token) {}

async function login(id, password) {
    const account = await users.findOne({
        where: {
            [Op.or]: [{ username: id }, { email: id }, { phone: id }],
        },
    });
    if (!account) return messages.errorClient("Account not found");
    if (await bcrypt.compare(password, account["password"]))
        return messages.success("Login Success", account);
    else return messages.errorClient("Invalid username or password");
}

async function keepLogin(token) {}

async function forgotPassword(email) {
    const account = await users.findOne({
        where: { email },
    });
    if (!account) return messages.errorServer("Account not exist");
    
    const payload = { id: account["id"] };
    const token = jwt.sign(payload, KEY_JWT, {
        expiresIn: "24h",
    });
    console.log(token);
    // Send token from email
    return messages.success("Please check your email to reset your password in 24 hours", token);
}

async function resetPassword(token, password) {}

module.exports = {
    register,
    verify,
    login,
    keepLogin,
    forgotPassword,
    resetPassword,
};
