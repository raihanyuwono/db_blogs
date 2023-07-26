const path = require("path");
const db = require("../models");
const messages = require("../services/messages");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = db["user"];
const { sendMail } = require("../helpers/transporter");
require("dotenv").config({
    path: path.resolve(__dirname, "../../.env"),
});

const SUBJECT_CHANGES = "Notification Changes";
const KEY_JWT = process.env.KEY_JWT;
const BASE_REDIRECT = "http://localhost:3000";

async function getAccount(id) {
    return await users.findOne({ where: { id } });
}

async function getUser(account) {
    const { id } = account;
    const result = await getAccount(id);
    const user = {
        username: result["username"],
        email: result["email"],
        phone: result["phone"],
        avatar: result["avatar"],
    };
    return messages.success("", user);
}

async function setUsername(account, username) {
    const { id } = account;

    const isExist = await users.findOne({ where: { username } });
    if (isExist) return messages.errorServer("Username has been used");
    account = await getAccount(id);

    return await db.sequelize.transaction(async function (t) {
        const result = await users.update(
            { username },
            { where: { id }, transaction: t }
        );
        const content = {
            username,
            context: "username",
        };
        await sendMail(account["email"], SUBJECT_CHANGES, content);
        return messages.success("Username has been changed");
    });
}

async function setEmail(account, email) {
    const { id } = account;

    const isExist = await users.findOne({ where: { email } });
    if (isExist) return messages.errorServer("Email has been used");
    account = getAccount(id);

    return await db.sequelize.transaction(async function (t) {
        const result = await users.update(
            { email, is_verified: false },
            { where: { id }, transaction: t }
        );
        const payload = { id };
        const token = jwt.sign(payload, KEY_JWT, {
            expiresIn: "24h",
        });
        const content = {
            username: account["username"],
            context: "VERIFY",
            redirect: `${BASE_REDIRECT}/verify/${token}`,
        };
        await sendMail(email, "Verify Your Account", content);
        return messages.success("Email has been changed");
    });
}

async function setPhone(account, phone) {
    const { id } = account;

    const isExist = await users.findOne({ where: { phone } });
    if (isExist) return messages.errorServer("Phone has been used");
    account = await getAccount(id);

    return await db.sequelize.transaction(async function (t) {
        const result = await users.update(
            { phone },
            { where: { id }, transaction: t }
        );
        const content = {
            username: account["username"],
            context: "phone",
        };
        await sendMail(account["email"], SUBJECT_CHANGES, content);
        return messages.success("Phone has been changed");
    });
}

async function setPassword(account, old_password, password, confirm_password) {
    const { id } = account;
    account = await getAccount(id);
    const compared = await bcrypt.compare(old_password, account["password"]);
    
    if (!compared) return messages.errorClient("Wrong password");
    if (password !== confirm_password)
        return messages.errorClient("Password must be same");

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    return await db.sequelize.transaction(async function (t) {
        const result = await users.update(
            { password: hashPassword },
            { where: { id }, transaction: t }
        );
        return messages.success("Password has been changed");
    });
}

async function setAvatar(account, file) {
    const { id } = account;
    const { path } = file;
    const oldAvatar = await users.findOne({ where: { id } });
    return await db.sequelize.transaction(async function (t) {
        const result = await users.update(
            { avatar: path },
            { where: { id }, transaction: t }
        );

        if (oldAvatar["avatar"]) await fs.promises.unlink(oldAvatar["avatar"]);

        return messages.success("Profile image has been changed");
    });
}

module.exports = {
    getUser,
    setUsername,
    setEmail,
    setPhone,
    setPassword,
    setAvatar,
};
