const { Op, col } = require("sequelize");
const db = require("../models");
const messages = require("../services/messages");

const users = db["user"];
const blogs = db["blog"];
const categories = db["category"];
const countries = db["country"];

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
    if (await isVerified(id))
        return messages.errorServer("Your account haven't been verified yet");
    const { path } = req.file;
    const { title, content, keywords, url_video, id_category, id_country } =
        req.body;
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
    console.log("SINI");

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
