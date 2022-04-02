const express = require('express');
const api = express.Router();
const passport = require('passport');

module.exports = (function() {

	api.use("*", function(req,res,next){
		console.log("User API index file");
		next();
	})

	api.post("/register", passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/login'
	}));

	api.post("/login", passport.authenticate('local-signin', {
		successRedirect: '/',
		failureRedirect: '/login'
	}))

	api.get("/:handler", (req,res) => {
		res.send("User API Call to: " + req.params.handler);
	});

	api.use("*", function(req,res) {
		res.send("USER API CALL ENDED");
	});

	return api;
})();