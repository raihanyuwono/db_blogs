const { sBlog } = require("../services");
const messages = require("../services/messages");
const TRY_AGAIN = { message: "Please try again" };

async function createBlog(req, res) {}

async function getBlogs(req, res) {
    try {
        const result = await sBlog.getBlogs(req.params);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(messages.response(TRY_AGAIN));
    }
}

async function getBlog(req, res) {
    try {
        const { id } = req.params;
        const result = await sBlog.getBlog(id);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}

async function getCategories(req, res) {
    try {
        const result = await sBlog.getCategories();
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}

async function getCountries(req, res) {
    try {
        const result = await sBlog.getCountries();
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        res.status(500).json(TRY_AGAIN);
    }
}

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    getCategories,
    getCountries,
};
