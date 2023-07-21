const router = require("express").Router();
const { cAuth } = require("../controllers");
const { mAuth, mValidator } = require("../middleware");

router.post("/register", mValidator.vRegistrationFields, mValidator.vResult, cAuth.register);
router.get("/verify", mAuth, cAuth.verify);
router.post("/login", mValidator.vLoginFields, mValidator.vResult, cAuth.login);
router.get("/login", mAuth, cAuth.keepLogin);
router.post("/forgot", cAuth.forgotPassword);
router.patch("/reset", mAuth, mValidator.vResetPasswordFields, mValidator.vResult,cAuth.resetPassword);

module.exports = router;
