const router = require("express").Router();
const { cBlog } = require("../controllers");
const { mAuth, mUploadFile } = require("../middleware");

router.post("/", mAuth, mUploadFile.single("thumbnail"), cBlog.createBlog);

router.get("/categories", cBlog.getCategories);
router.get("/countries", cBlog.getCountries);

router.get("/", cBlog.getBlogs);
router.get("/:id", cBlog.getBlog);

module.exports = router;
