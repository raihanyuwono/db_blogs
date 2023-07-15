const router = require('express').Router();

router.get("/", (req, res) => {
    res.send("This is Blog router");
});

// create blog
// latest post
// filter-sort

module.exports = router;