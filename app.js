const express = require('express');
const env = require("dotenv").config();
const bodyParser = require('body-parser');
const Sequelize = require("sequelize");
const passport = require("passport");

var models = require('./api/DBmodels');

require('./api/config/passport')(passport, models.user);

models.sequelize.sync().then(function() {
	console.log('Database sync successful')
}).catch(function(err) {
	console.log(err, "Database sync failed, cannot start server")
	process.exit();
});

const app = express();

app.use(bodyParser.json());

app.use("*", function(req,res,next){
	console.log("Index print body");
	console.log(req.body);
	next();
});

//************************
//API ROUTES
//************************

app.use("/api", require('./routes/api/index'));

//************************
//APP ROUTES
//************************

require('./routes/app/index')(app);

//************************
//START APP
//************************
app.listen(3001, function(){
	console.log("API SERVER IS RUNNING ON PORT 3001!");
});
