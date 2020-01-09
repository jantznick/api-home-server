var baby = require('express').Router();

baby.use("*", function(req, res, next) {
    console.log("BABY ROUTE:");
    console.log(req.originalUrl);
    next();
});

baby.post("/diaper", function(req, res) {
    res.send("Baby diaper update");
});

baby.post("/feed", (req, res) => {
    res.send("baby feed update");
});

baby.use("*", function(req,res) {
    res.send("BABY CALL ENDED");
});

module.exports = baby;