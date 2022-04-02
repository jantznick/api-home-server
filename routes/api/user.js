const express = require('express');
const res = require('express/lib/response');
const api = express.Router();
const passport = require('passport');

const errorCodes = require('../../errorCodes');

module.exports = (function() {

	api.use("*", function(req,res,next){
		console.log("User API index file");
		next();
	})

	api.post("/register", (req, res) => {
		passport.authenticate('local-signup', function(err, user, info){
			if(err || info) {
				res.json(errorCodes.registerFailure)
			}
			if(user) {
				res.json(errorCodes.registerSuccess)
			}
		})(req, res);
	});

	api.post("/login", (req, res) => {
		passport.authenticate('local-signin', function(err, user, info){
			if(err || info) {
				res.json(errorCodes.loginFailure)
			}
			if(user) {
				req.logIn(user, (err) => {
					if (err) {
						return res.send(err);
					}
					return res.json(errorCodes.loginSuccess)
				});
			}
		})(req, res);
	});

	api.post("/logout", (req, res) => {
		req.logOut();
		res.json(errorCodes.logoutSuccess)
	})

	api.get("/:handler", (req,res) => {
		res.send("User API Call to: " + req.params.handler);
	});

	api.use("*", function(req,res) {
		res.send("USER API CALL ENDED");
	});

	return api;
})();