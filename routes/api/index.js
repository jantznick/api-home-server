const express = require('express');
const api = express.Router();

const user = require('./user.js');

module.exports = (function() {
	api.use("*", function(req,res,next){
		console.log("API index file");
		console.log(req.body);
		next();
	})

	api.use("/user", user);

	api.get("/asdf", function(req,res) {
		res.send("API asdf call");
	});

	api.get("/:handler", (req,res) => {
		res.send("Call to: " + req.params.handler);
	});

	api.use("*", function(req,res) {
		res.send("API CALL ENDED");
	});

	return api;
})();