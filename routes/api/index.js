const express = require('express');
const api = express.Router();

const user = require('./user.js');

const errorCodes = require('../../errorCodes');

module.exports = (() => {
	api.use("*", (req, res, next) => {
		next();
	})

	api.use("/user", user);

	api.get("/asdf", (req, res) => {
		res.send("API asdf call");
	});

	api.get("/test", (req, res) => {
		if(req.isAuthenticated()) {
			return res.json(errorCodes.testSuccess)
		};
		res.json(errorCodes.testFailure);
	});

	api.get("/:handler", (req, res) => {
		res.send("Call to: " + req.params.handler);
	});

	api.use("*", (req, res) => {
		res.send("API CALL ENDED");
	});

	return api;
})();