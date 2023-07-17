const {sBlog} =  require("../services");
const messages =  require("../services/messages");
const TRY_AGAIN = {message: "Please try again"}

async function createBlog(req, res) {}
async function getBlogs(req, res) {
    const {} = req.query;

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
async function getCategories(req, res) {}
async function getCountries(req, res) {}

module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    getCategories,
    getCountries,
};
