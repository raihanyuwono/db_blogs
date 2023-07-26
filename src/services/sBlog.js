const fs = require("fs");
const { Op, col } = require("sequelize");
const db = require("../models");
const messages = require("../services/messages");

const users = db["user"];
const blogs = db["blog"];
const categories = db["category"];
const countries = db["country"];
const likes = db["like"];

const oAttr = {
    include: [
        [col("_category.name"), "category"],
        [col("_country.name"), "country"],
    ],
    exclude: ["id_user", "id_category", "id_country"],
};

const oInclude = [
    {
        model: users,
        as: "author",
        attributes: ["username", "avatar"],
    },
    {
        model: categories,
        as: "_category",
        attributes: [],
    },
    {
        model: countries,
        as: "_country",
        attributes: [],
    },
];

function setPagination(page, limit) {
    return {
        offset: (page - 1) * limit,
        limit: parseInt(limit),
    };
}

async function isVerified(id) {
    const result = await users.findOne({ where: { id } });
    return result["is_verified"];
}

async function createBlog(req) {
    const { id } = req.account;
    const is_verified = await isVerified(id);
    if (!is_verified) return messages.errorServer("Your account haven't been verified yet");
    const { path } = req.file;
    const { title, content, keywords, url_video, id_category, id_country } = req.body;
    return await db.sequelize.transaction(async function (t) {
        const result = await blogs.create(
            {
                title,
                content,
                keywords,
                url_img: path,
                url_video,
                id_category,
                id_country,
                id_user: id,
            },
            { transaction: t }
        );
        return messages.success("Blog has been created");
    });
}

async function getBlogs({ title, id_category, order = "DESC", page = 1, limit = 10 }) {
    const pagination = setPagination(page, limit);
    const oWhere = {};
    if (title) oWhere["title"] = { [Op.like]: `%${title}%` };
    if (id_category) oWhere["id_category"] = parseInt(id_category);
    const counter = await blogs.count();

    const result = await blogs.findAll({
        attributes: oAttr,
        where: oWhere,
        order: [["created_at", order]],
        include: oInclude,
        ...pagination,
    });
    return messages.success("", {
        pages: Math.ceil(counter / limit),
        blogs: result,
    });
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

async function delBlog(account, id_blog) {
    const { id } = account;
    const is_verified = await isVerified(id);
    if (!is_verified) return messages.errorServer("Your account haven't been verified yet");
    const isExist = await blogs.findOne({ where: { id: id_blog } });
    if (!isExist) return messages.errorServer("Not Found");
    if (isExist["id_user"] !== id)
        return messages.errorServer("You are not the author of this blog");

    return await db.sequelize.transaction(async function (t) {
        const result = await blogs.destroy(
            { where: { id: id_blog } },
            { transaction: t }
        );
        await fs.promises.unlink(isExist["url_img"]);
        return messages.success("Blog has been deleted");
    });
}

async function getLike(id) {
    const result = await likes.findAll({
        attributes: {
            exclude: ["id", "id_user", "created_at"],
        },
        where: { id_blog: id },
        include: [
            {
                model: users,
                attributes: ["username", "avatar"],
            },
        ],
    });
    return messages.success("", result);
}

async function addLike(account, id_blog) {
    const { id } = account;
    const is_verified = await isVerified(id);
    if (!is_verified) return messages.errorServer("Your account haven't been verified yet");
    const isExist = await likes.findOne({
        where: { [Op.and]: [{ id_user: id }, { id_blog }] },
    });
    if (isExist) return messages.errorServer("You already like this blog");

    return await db.sequelize.transaction(async function (t) {
        const result = await likes.create(
            {
                id_user: id,
                id_blog,
            },
            { transaction: t }
        );
        return messages.success("Like has been added");
    });
}

async function delLike(account, id_blog) {
    const { id } = account;
    const is_verified = await isVerified(id);
    if (!is_verified) return messages.errorServer("Your account haven't been verified yet");
    const isExist = await likes.findOne({
        where: { [Op.and]: [{ id_user: id }, { id_blog }] },
    });
    if (!isExist) return messages.errorServer("Not Found");

    return await db.sequelize.transaction(async function (t) {
        const result = await likes.destroy(
            { where: { [Op.and]: [{ id_user: id }, { id_blog }] } },
            { transaction: t }
        );
        return messages.success("Like has been removed");
    });
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
    delBlog,
    getLike,
    addLike,
    delLike,
    getCategories,
    getCountries,
};