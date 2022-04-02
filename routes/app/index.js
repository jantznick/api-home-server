var path = require("path");

module.exports = function(app) {
	app.use("*", function(req,res,next){
		console.log("app index file");
		next();
	})

	// "../../app/components/login.html"
	app.get("/login", function(req,res) {
		res.sendFile(path.join(__dirname, '../../app/components', 'login.html'));
	});

	app.get("/auth-only", function(req, res) {
		console.log(req.session);
		if(req.isAuthenticated()) {
			return res.sendFile(path.join(__dirname, '../../app/components', 'auth-only.html'));
		}
		res.send("App call to: " + req.params.handler);
	});

	app.get("/:handler", (req,res) => {
		res.send("App call to: " + req.params.handler);
	});

	app.use("*", function(req,res) {
		res.send("APP CALL ENDED");
	});
};