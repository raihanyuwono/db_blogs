const { sAuth } = require("../services");
const TRY_AGAIN = { message: "Please try again" };
const messages = require("../services/messages");

async function register(req, res) {
    try {
        const { username, email, phone, password } = req.body;
        const result = await sAuth.register(username, email, phone, password);
        // console.log("REGISTER")
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}

async function verify(req, res) {
    try {
        const account = req.account;
        const result = await sAuth.verify(account);
        res.status(result.status).json(
            messages.response({ message: result.message })
        );
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}
async function login(req, res) {
    try {
        const { id, password } = req.body;
        const result = await sAuth.login(id, password);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}

async function keepLogin(req, res) {
    try {
        const account = req.account;
        const result = await sAuth.keepLogin(account);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}

async function forgotPassword(req, res) {
    try {
        const { email } = req.body;
        const result = await sAuth.forgotPassword(email);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}

async function resetPassword(req, res) {
    try {
        const account = req.account;
        const { password } = req.body;
        const result = await sAuth.resetPassword(account, password);
        res.status(result.status).json(
            messages.response({ message: result.message })
        );
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}

module.exports = {
    register,
    verify,
    login,
    keepLogin,
    forgotPassword,
    resetPassword,
};
