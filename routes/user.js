var passport = require('passport');

var user = require('express').Router();

user.use("*", function(req, res, next) {
	console.log("USER ROUTE:");
	console.log(req.originalUrl);
	next();
});

user.post("/register", passport.authenticate('local-signup', {
	successRedirect: '/',
	failureRedirect: '/'
}));

user.use("*", function(req,res) {
	res.send("USER CALL ENDED");
});

module.exports = user;