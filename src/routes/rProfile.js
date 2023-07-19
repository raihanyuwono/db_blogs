const router = require("express").Router();
const { cProfile } = require("../controllers");
const { mAuth, mUploadFile } = require("../middleware");

router.get("/", mAuth, cProfile.getUser);
router.patch("/username", mAuth, cProfile.setUsername);
router.patch("/email", mAuth, cProfile.setEmail);
router.patch("/phone", mAuth, cProfile.setPhone);
router.patch("/password", mAuth, cProfile.setPassword);
router.patch("/avatar", mAuth, mUploadFile.single("avatar"), cProfile.setAvatar);

module.exports = router;
