const router = require("express").Router();
const { cAuth } = require("../controllers");
const { mAuth } = require("../middleware");

router.get("/", (req, res) => {
    res.send("This is Auth router");
});

router.post("/register", cAuth.register);
router.get("/verify", mAuth, cAuth.verify);
router.post("/login", cAuth.login);
router.get("/login", mAuth, cAuth.keepLogin);
router.post("/forgot", cAuth.forgotPassword);
router.patch("/reset", mAuth, cAuth.resetPassword);

module.exports = router;
