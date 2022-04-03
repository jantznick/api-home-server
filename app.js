const express = require('express');
const env = require("dotenv").config();
const bodyParser = require('body-parser');
const Sequelize = require("sequelize");
const passport = require("passport");
const session = require("express-session");

var SequelizeStore = require("connect-session-sequelize")(session.Store);

var db = require('./api/DBmodels');

require('./api/config/passport')(passport, db.user);

db.sequelize.sync().then(() => {
	console.log('Database sync successful')
}).catch((err) => {
	console.log(err, "Database sync failed, cannot start server")
	process.exit();
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	secret: 'secret',
	saveUninitialized: false,
	resave: false,
	store: new SequelizeStore({
		db: db.sequelize,
	}),
	cookie: {
		secure: false
	}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("*", (req, res, next) => {
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
app.listen(3001, () => {
	console.log("API SERVER IS RUNNING ON PORT 3001!");
});
