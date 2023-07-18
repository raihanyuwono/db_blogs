const { Op } = require("sequelize");
const db = require("../models");
const messages = require("../services/messages");

const users = db["user"];
const blogs = db["blog"];
const categories = db["category"];
const countries = db["country"];

const oAttr = { exclude: ["id_user", "id_category", "id_country"] };
const oInclude = [
    {
        model: users,
        // as: "author",
        attributes: ["username", "avatar"],
    },
    {
        model: categories,
        attributes: ["name"],
    },
    {
        model: countries,
        attributes: ["name"],
    },
];

function setPagination(page, limit) {
    return {
        offset: (page - 1) * limit,
        limit: parseInt(limit),
    };
}

async function createBlog() {

}

async function getBlogs({
    title,
    id_category,
    order = "DESC",
    page = 1,
    limit = 10,
}) {
    const pagination = setPagination(page, limit);
    const params = {};

    if (title) params["title"] = { [Op.like]: `%${title}%` };
    if (id_category) params["id_category"] = parseInt(id_category);

    const result = await blogs.findAll({
        attributes: oAttr,
        where: params,
        order: [["created_at", order]],
        include: oInclude,
        ...pagination,
    });
    return messages.success("", result);
}

async function getBlog(id) {
    const result = await blogs.findOne({
        attributes: oAttr,
        where: { id },
        include: oInclude,
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
