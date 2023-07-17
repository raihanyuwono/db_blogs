const db = require("../models");
const messages = require("../services/messages");
const bcrypt = require("bcrypt");
const users = db["user"];

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
    return await db.sequelize.transaction(async (t) => {
        const result = await users.update(
            { username },
            { where: { id }, transaction: t }
        );
        return messages.success("Username has been changed");
    });
}

async function setEmail(account, email) {
    const { id } = account;
    return await db.sequelize.transaction(async (t) => {
        const result = await users.update(
            { email },
            { where: { id }, transaction: t }
        );
        return messages.success("Email has been changed");
    });
}

async function setPhone(account, phone) {
    const { id } = account;
    return await db.sequelize.transaction(async (t) => {
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
    return await db.sequelize.transaction(async (t) => {
        const result = await users.update(
            { password: hashPassword },
            { where: { id }, transaction: t }
        );
        return messages.success("Password has been changed");
    });
}
async function setAvatar(account) {

}

module.exports = {
    getUser,
    setUsername,
    setEmail,
    setPhone,
    setPassword,
    setAvatar,
};
