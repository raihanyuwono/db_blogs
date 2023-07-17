const router = require("express").Router();
const { cBlog } = require("../controllers");
const { mAuth } = require("../middleware");

// create blog
router.post("/", mAuth);
// get blogs -> Can use query to filter and sort
router.get("/", );
// get blog
router.get("/:id", cBlog.getBlog);
// get categories
router.get("/categories");
// get countries
router.get("/countries");

module.exports = router;
