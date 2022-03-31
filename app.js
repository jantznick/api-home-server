const express   = require('express');
app             = express();
server          = require('http').createServer(app);
io              = require('socket.io')(server);
methodOverride  = require('method-override'),
bodyParser      = require('body-parser'),
env             = require("dotenv").config(),
mysql           = require('mysql'),
passport        = require('passport'),
localStrategy   = require('passport-local'),
sequelize       = require('sequelize'),
session         = require('express-session');

//Models
var models = require('./DBmodels');

//load passport strategies
// require('./app/config/passport/passport.js')(passport, models.user);
require('./config/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
	console.log('Database sync successful')
}).catch(function(err) {
	console.log(err, "Database sync failed")
});

app.use(methodOverride('_method'));

app.use(bodyParser.urlencoded({ extended: false }))

// For Passport
app.use(session({
	secret: 'jantzHOUSE authentication key',
	resave: true,
	saveUninitialized:true,
	cookie: {
		maxAge: 604800000
	}
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use("/api", require('./routes/api/index'));

//************************
//APP ROUTES
//************************

app.use("*", function(req, res) {
	res.status(404).json({
		result: 'error',
		message: 'route not found'
	})
});

//************************
//START APP
//************************
server.listen(3001, function(){
	console.log("API SERVER IS RUNNING ON PORT 3001!");
});
