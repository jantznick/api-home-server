module.exports = function(app) {
	app.use("*", function(req,res,next){
		console.log("app index file");
		next();
	})

	app.get("/asdf", function(req,res) {
		res.send("app asdf call");
	});

	app.get("/:handler", (req,res) => {
		res.send("App call to: " + req.params.handler);
	});

	app.use("*", function(req,res) {
		res.send("APP CALL ENDED");
	});
};