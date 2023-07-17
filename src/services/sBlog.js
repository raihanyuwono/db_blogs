const db = require("../models");
const messages = require("../services/messages");

const blogs = db["blog"];

async function createBlog() {}
async function getBlogs() {}
async function getBlog(id) {
    const result = await blogs.findOne({
        where: { id },
    });
    if(!result) return messages.errorClient("Not Found");
    return messages.success("", result);
}
async function getCategories() {}
async function getCountries() {}

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    getCategories,
    getCountries,
};
