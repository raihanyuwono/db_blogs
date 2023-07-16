const { sAuth } = require("../services");

async function register(req, res) {
    try {
        const { username, email, phone, password } = req.body;
        const result = await sAuth.register(username, email, phone, password);
        res.status(result.status).json(result.message);
    } catch (error) {
        res.status(500).json("Please try again");
    }
}

async function verify(req, res) {
    const { token } = req.params;
    try {
    } catch (error) {}
}
async function login(req, res) {
    try {
        const { id, password } = req.body;
        const result = await sAuth.login(id, password);
        res.status(result.status).json({ message: result.message });
    } catch (error) {
        res.status(500).json("Please try again");
    }
}

async function keepLogin(req, res) {
    const headers = req.headers.authorization;
    const token = headers.split(" ")[1];
    try {
    } catch (error) {}
}

async function forgotPassword(req, res) {
    const { email } = req.body;
    result = await sAuth.forgotPassword(email);
    res.status(result.status).json(result.message);
    try {
    } catch (error) {}
}

async function resetPassword(req, res) {
    const headers = req.headers.authorization;
    const token = headers.split(" ")[1];
    const { password } = req.body;
    try {
    } catch (error) {}
}

module.exports = {
    register,
    verify,
    login,
    keepLogin,
    forgotPassword,
    resetPassword,
};
