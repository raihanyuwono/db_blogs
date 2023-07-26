const router = require("express").Router();
const { cBlog } = require("../controllers");
const { mAuth, mUploadFile } = require("../middleware");

router.post("/", mAuth, mUploadFile.single("thumbnail"), cBlog.createBlog);

router.get("/categories", cBlog.getCategories);
router.get("/countries", cBlog.getCountries);

router.get("/like/:id", cBlog.getLike);
router.post("/like", mAuth, cBlog.addLike);
router.delete("/like/:id", mAuth, cBlog.delLike);

router.get("/", cBlog.getBlogs);
router.get("/:id", cBlog.getBlog);
router.delete("/:id", mAuth, cBlog.delBlog);

module.exports = router;
