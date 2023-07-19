const { Op, col } = require("sequelize");
const db = require("../models");
const messages = require("../services/messages");

const users = db["user"];
const blogs = db["blog"];
const categories = db["category"];
const countries = db["country"];

const oAttr = { 
    include: [
        [col("category.name"), "category"],
        [col("country.name"), "country"],
    ],
    exclude: ["id_user", "id_category", "id_country"] 
};
const oInclude = [
    {
        model: users,
        as: "author",
        attributes: ["username", "avatar"],
    },
    {
        model: categories,
        attributes: [],
    },
    {
        model: countries,
        attributes: [],
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
    const oWhere = {};

    if (title) oWhere["title"] = { [Op.like]: `%${title}%` };
    if (id_category) oWhere["id_category"] = parseInt(id_category);

    const result = await blogs.findAll({
        attributes: oAttr,
        where: oWhere,
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
