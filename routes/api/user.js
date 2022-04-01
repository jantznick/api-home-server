const express = require('express');
const api = express.Router();

module.exports = (function() {

	api.use("*", function(req,res,next){
		console.log("User API index file");
		console.log(req.body);
		next();
	})

	api.get("/asdf", function(req,res) {
		res.send("User API asdf call");
	});

	api.get("/:handler", (req,res) => {
		res.send("User API Call to: " + req.params.handler);
	});

	api.use("*", function(req,res) {
		res.send("USER API CALL ENDED");
	});

	return api;
})();