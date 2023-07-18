const { Op } = require("sequelize");
const db = require("../models");
const messages = require("../services/messages");

const blogs = db["blog"];
const categories = db["category"];
const countries = db["country"];

async function createBlog() {}

async function getBlogs({ title, id_category, order = "DESC" }) {
    const params = {};
    if (title) params["title"] = { [Op.like]: `%${title}%` };
    if (id_category) params["id_category"] = id_category;
    const result = await blogs.findAll({
        where: params,
        order: [["created_at", order]],
    });
    return messages.success("", result);
}

async function getBlog(id) {
    const result = await blogs.findOne({
        where: { id },
    });
    if (!result) return messages.errorClient("Not Found");
    return messages.success("", result);
}
async function getCategories() {
    const result = await categories.findAll();
    return messages.success("", result);
}

async function getCountries() {
    const result = await countries.findAll();
    return messages.success("", result);
}

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    getCategories,
    getCountries,
};
