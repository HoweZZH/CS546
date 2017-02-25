const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    console.log("clientForm GET")
    res.render("form/client", {});
});

module.exports = router;


