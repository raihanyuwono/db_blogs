const fs = require("fs");
const { sBlog } = require("../services");
const messages = require("../services/messages");
const TRY_AGAIN = { message: "Please try again" };

async function createBlog(req, res) {
    try {
        const result = await sBlog.createBlog(req);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        await fs.promises.unlink(req.file.path);
        res.status(500).json(messages.response(TRY_AGAIN));
    }
}

async function getBlogs(req, res) {
    try {
        const result = await sBlog.getBlogs(req.query);
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

async function getLike(req, res) {
    try {
        const { id } = req.params;
        const result = await sBlog.getLike(id);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        console.log(error);
        res.status(500).json(TRY_AGAIN);
    }
}

async function addLike(req, res) {
    try {
        const { account } = req;
        const {id_blog} = req.body;
        const result = await sBlog.addLike(account, id_blog);
        res.status(result.status).json(messages.response(result));
    } catch (error) {
        console.log(error);
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
    getLike,
    addLike,
    getCategories,
    getCountries,
};
