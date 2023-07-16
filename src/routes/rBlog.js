const router = require("express").Router();
const { cBlog } = require("../controllers");

router.get("/", (req, res) => {
    res.send("This is Blog router");
});

// create blog
// latest post
// filter-sort

module.exports = router;
