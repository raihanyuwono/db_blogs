const router = require("express").Router();
const {cAuth} = require("../controllers");

router.get("/", (req, res) => {
    res.send("This is Auth router");
});

router.post("/register", cAuth.register);
router.get("/verify/:token", cAuth.verify);
router.post("/login", cAuth.login);
router.get("/login", cAuth.keepLogin);
router.post("/forgot", cAuth.forgotPassword);
router.post("/reset", cAuth.resetPassword);

module.exports = router;
