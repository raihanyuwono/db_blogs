const fs = require("fs");
const { sProfile } = require("../services");
const messages = require("../services/messages");
const TRY_AGAIN = { message: "Please try again" };

async function getUser(req, res) {
    try {
        const account = req.account;
        const result = await sProfile.getUser(account);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}

async function setUsername(req, res) {
    try {
        const account = req.account;
        const { username } = req.body;
        const result = await sProfile.setUsername(account, username);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}

async function setEmail(req, res) {
    try {
        const account = req.account;
        const { email } = req.body;
        const result = await sProfile.setEmail(account, email);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}

async function setPhone(req, res) {
    try {
        const account = req.account;
        const { phone } = req.body;
        const result = await sProfile.setPhone(account, phone);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}

async function setPassword(req, res) {
    try {
        const account = req.account;
        const { old_password, password, confirm_password } = req.body;
        const result = await sProfile.setPassword(
            account,
            old_password,
            password,
            confirm_password
        );
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}

async function setAvatar(req, res) {
    const file = req.file;
    try {
        const account = req.account;
        const result = await sProfile.setAvatar(account, file);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        await fs.promises.unlink(file.path);
        res.status(500).json(TRY_AGAIN);
    }
}

module.exports = {
    getUser,
    setUsername,
    setEmail,
    setPhone,
    setPassword,
    setAvatar,
};
