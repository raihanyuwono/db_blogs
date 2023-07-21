const fs = require("fs");
const db = require("../models");
const messages = require("../services/messages");
const bcrypt = require("bcrypt");
const users = db["user"];
const { sendMail } = require("../helpers/transporter");
const handlebars = require("handlebars");

const SUBJECT_CHANGES = "Notification Changes";

async function findUser(id) {
    return await users.findOne({ where: { id } });
}

async function emailContent({username, attribute}) {
    const template = await fs.promises.readFile(
        path.resolve(__dirname, "../notifications/changes.html"),
        "utf-8"
    );
    const tempCompile = handlebars.compile(template);
    const tempResult = tempCompile({
        username,
        attribute,
    });
    return tempResult;
}

async function getUser(account) {
    const { id } = account;
    const result = await users.findOne({
        where: { id },
    });
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
    const beforeChange = findUser(id);
    return await db.sequelize.transaction(async function (t) {
        const result = await users.update(
            { username },
            { where: { id }, transaction: t }
        );
        const content = {
            username: beforeChange["username"],
            attribute: "username",
        };
        await sendMail(result["email"], SUBJECT_CHANGES, await emailContent(content));
        return messages.success("Username has been changed");
    });
}

async function setEmail(account, email) {
    const { id } = account;
    return await db.sequelize.transaction(async function (t) {
        const result = await users.update(
            { email },
            { where: { id }, transaction: t }
        );
        return messages.success("Email has been changed");
    });
}

async function setPhone(account, phone) {
    const { id } = account;
    return await db.sequelize.transaction(async function (t) {
        const result = await users.update(
            { phone },
            { where: { id }, transaction: t }
        );
        return messages.success("Phone has been changed");
    });
}

async function setPassword(account, password) {
    const { id } = account;
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
