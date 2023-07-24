const router = require("express").Router();
const { cProfile } = require("../controllers");
const { mAuth, mValidator, mUploadFile } = require("../middleware");

router.get("/", mAuth, cProfile.getUser);
router.patch("/username", mAuth, mValidator.vUsername, mValidator.vResult, cProfile.setUsername);
router.patch("/email", mAuth, cProfile.setEmail);
router.patch("/phone", mAuth, mValidator.vPhone, mValidator.vResult, cProfile.setPhone);
router.patch("/password", mAuth, mValidator.vChangePasswordFields, mValidator.vResult, cProfile.setPassword);
router.patch("/avatar", mAuth, mUploadFile.single("avatar"), cProfile.setAvatar);

module.exports = router;
