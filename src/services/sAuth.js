const path = require("path");
const { sendMail } = require("../helpers/transporter");
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
const BASE_REDIRECT = "http://localhost:3000";

// db.sequelize.sync({ alter: true });

async function hashPass(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function isExist(username, email, phone) {
    const checkAccount = await users.findAll({
        where: {
            [Op.or]: [{ username }, { email }, { phone }],
        },
    });
    if (checkAccount.length === 0) return false;
    if (
        checkAccount.length === 1 &&
        checkAccount[0]["email"] === email &&
        !checkAccount[0]["is_verified"]
    )
        return checkAccount[0];
    return true;
}

async function updateRegistration(id, username, phone, password) {
    return await db.sequelize.transaction(async function (t) {
        return await users.update(
            { username, phone, password },
            { where: { id }, transaction: t }
        );
    });
}

async function createAccount(username, email, phone, password) {
    return await db.sequelize.transaction(async function (t) {
        return await users.create(
            {
                username,
                email,
                phone,
                password,
            },
            { transaction: t }
        );
    });
}

async function getAccount(id) {
    return await users.findOne({ where: { id } });
}

async function register(username, email, phone, password) {
    if (!username || !email || !phone || !password)
        messages.errorClient("Please fill all the data");

    const account = await isExist(username, email, phone);
    if (account === true) return messages.errorServer("Account already exist");
    const hashPassword = await hashPass(password);

    let result;
    if (account)
        result = await updateRegistration(
            account["id"],
            username,
            phone,
            hashPassword
        );
    else result = await createAccount(username, email, phone, hashPassword);

    const payload = { id: account ? account["id"] : result["id"] };
    const token = jwt.sign(payload, KEY_JWT, {
        expiresIn: "24h",
    });

    const content = {
        username: account ? account["username"] : result["username"],
        context: "VERIFY",
        redirect: `${BASE_REDIRECT}/verify/${token}`,
    };
    await sendMail(
        account ? account["email"] : result["email"],
        "Verify Your Account",
        content
    );

    return messages.success(VERIFY_MESSAGE);
}

async function verify(account) {
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

    return messages.success("Login Success", { token });
}

async function keepLogin(account) {
    const payload = { id: account["id"] };
    const token = jwt.sign(payload, KEY_JWT, {
        expiresIn: "1h",
    });
    return messages.success("Token has been updated", { token });
}

async function forgotPassword(email) {
    const account = await users.findOne({
        where: { email },
    });
    if (!account) return messages.errorServer("Account not exist");

    const payload = { id: account["id"] };
    const token = jwt.sign(payload, KEY_JWT, {
        expiresIn: "4h",
    });

    const content = {
        username: account["username"],
        context: "RESET PASSWORD",
        redirect: `${BASE_REDIRECT}/reset/${token}`,
    };
    await sendMail(email, "Reset Your Password", content);
    return messages.success(
        "Please check your email to reset your password in 2 hours"
    );
}

async function resetPassword(account, password, confirm_password) {
    if (password !== confirm_password)
        return messages.errorClient("Password must be same");
    const id = account["id"];
    account = await getAccount(id);
    const hashPassword = await hashPass(password);
    return await db.sequelize.transaction(async function (t) {
        const result = await users.update(
            { password: hashPassword },
            { where: { id }, transaction: t }
        );
        const content = {
            username: account["username"],
            context: "Password",
        };
        await sendMail(account["email"], "Notification Data Change", content);
        return messages.success("Password has been reseted", result);
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
