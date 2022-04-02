const express = require('express');
const api = express.Router();

const user = require('./user.js');

module.exports = (() => {
	api.use("*", (req,res,next) => {
		console.log("API index file");
		next();
	})

	api.use("/user", user);

	api.get("/asdf", (req,res) => {
		res.send("API asdf call");
	});

	api.get("/:handler", (req,res) => {
		res.send("Call to: " + req.params.handler);
	});

	api.use("*", (req,res) => {
		res.send("API CALL ENDED");
	});

	return api;
})();