const router = require("express").Router();
const { cProfile } = require("../controllers");

router.get("/", (req, res) => {
    res.send("This is Profile router");
});

// Change username
// Change email
// Change phone
// Change password
// Change avatar

module.exports = router;
