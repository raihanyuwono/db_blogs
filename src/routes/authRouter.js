const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("This is Auth router");
});

// Register
// Verify
// Login
// Forget Password
// Reset Password

module.exports = router;
