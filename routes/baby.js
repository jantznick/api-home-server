var baby = require('express').Router();
var models = require('../DBmodels');

baby.use("*", function(req, res, next) {
    console.log("BABY ROUTE:");
    console.log(req.originalUrl);
    next();
});

baby.post("/diaper/add*", (req, res) => {
    let {
        pee,
        poop,
        time
    } = {...req.body};
    if (time === null) {
        time = new Date();
    }
    models.diaper.create({
        pee,
        poop,
        time
    }).then(newEntry => {
        console.log(`New entry created: ${newEntry}`)
    });
    res.status(200).json({
        action: 'diaper added'
    });
});

baby.post("/feeding/add", (req, res) => {
    console.log(req.body);
    let {
        breast,
        amount,
        startTime,
        finishTime,
    } = {...req.body};
    if (amount) {
        finishTime = startTime;
    }
    models.feeding.create({
        breast,
        amount,
        startTime,
        finishTime
    }).then(newEntry => {
        console.log(`New entry created: ${newEntry}`)
    });
    res.status(200).json({
        action: 'feeding added'
    });
});

baby.use("*", function(req,res) {
    res.send("BABY CALL ENDED");
});

module.exports = baby;