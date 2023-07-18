const router = require("express").Router();
const { cBlog } = require("../controllers");
const { mAuth } = require("../middleware");

// create blog
router.post("/", mAuth);

router.get("/categories", cBlog.getCategories);
router.get("/countries", cBlog.getCountries);

// get blogs -> Can use query to filter and sort
router.get("/", cBlog.getBlogs);
router.get("/:id", cBlog.getBlog);

module.exports = router;
