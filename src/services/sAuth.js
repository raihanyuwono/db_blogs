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

async function hashPass(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function updateAccount(id, username, password, message) {
    return await db.sequelize.transaction(async (t) => {
        const result = await users.update(
            { username, password },
            { where: { id }, transaction: t }
        );
        return messages.success(message, result);
    });
}

async function createAccount(username, email, phone, password) {
    console.log(username, email, phone, password);
    return await db.sequelize.transaction(async (t) => {
        const result = await users.create(
            {
                username,
                email,
                phone,
                password,
            },
            { transaction: t }
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

    const hashPassword = await hashPass(password)

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

async function verify(token) {
    if (!token) return messages.errorClient("Unauthorized request");

    const account = jwt.verify(token, KEY_JWT);
    if (!account) return messages.errorClient("Token has been expired");
    const result = await users.update(
        { is_verified: true },
        { where: { id: account["id"] } }
    );
    return messages.success("Your account has been verified", result);
}

async function login(id, password) {
    const account = await users.findOne({
        where: {
            [Op.or]: [{ username: id }, { email: id }, { phone: id }],
        },
    });
    if (!account) return messages.errorClient("Account not found");

    const compared = await bcrypt.compare(password, account["password"]);
    if (!compared) return messages.errorClient("Invalid username or password");
    const payload = { id: account["id"] };
    const token = jwt.sign(payload, KEY_JWT, {
        expiresIn: "1h",
    });

    return messages.success("Login Success", token);
}

async function keepLogin(account) {
    const payload = { id: account["id"] };
    const newToken = jwt.sign(payload, KEY_JWT, {
        expiresIn: "1h",
    });
    return messages.success("Token has been updated", newToken);
}

async function forgotPassword(email) {
    const account = await users.findOne({
        where: { email },
    });
    if (!account) return messages.errorServer("Account not exist");

    const payload = { id: account["id"] };
    const token = jwt.sign(payload, KEY_JWT, {
        expiresIn: "24h",
    });
    // console.log(token);
    // Send token from email
    return messages.success(
        "Please check your email to reset your password in 24 hours",
        token
    );
}

async function resetPassword(account, password) {
    const id = account["id"];
    const hashPassword = await hashPass(password);
    return await db.sequelize.transaction(async (t) => {
        const result = await users.update(
            { password: hashPassword },
            { where: { id }, transaction: t }
        );
        return messages.success("Password has been changed", result);
    });
}

module.exports = {
    register,
    verify,
    login,
    keepLogin,
    forgotPassword,
    resetPassword,
};
