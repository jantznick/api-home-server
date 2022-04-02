var path = require("path");

module.exports = (app) => {
	app.use("*", (req,res,next) => {
		next();
	})

	app.get("/login", (req,res) => {
		res.sendFile(path.join(__dirname, '../../app/components', 'login.html'));
	});

	app.get("/auth-only", (req, res) => {
		if(req.isAuthenticated()) {
			return res.sendFile(path.join(__dirname, '../../app/components', 'auth-only.html'));
		}
		res.send("App call to: " + req.params.handler);
	});

	app.get("/:handler", (req,res) => {
		res.send("App call to: " + req.params.handler);
	});

	app.use("*", (req,res) => {
		res.send("APP CALL ENDED");
	});
};