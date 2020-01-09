const express   = require('express');
app             = express();
server          = require('http').createServer(app);
io              = require('socket.io')(server);
methodOverride  = require('method-override'),
bodyParser      = require('body-parser'),
env             = require("dotenv"),
mysql           = require('mysql'),
passport        = require('passport'),
localStrategy   = require('passport-local'),
sequelize       = require('sequelize'),
session         = require('express-session');

var omdbKey = "169527a1";
var plexToken = "8GtPoY9QxszkJ3i8GCSB";

//Models
// var models = require("./app/models");

//load passport strategies
// require('./app/config/passport/passport.js')(passport, models.user);

//Sync Database
// models.sequelize.sync().then(function() {
//     console.log('Nice! Database looks fine')
// }).catch(function(err) {
//     console.log(err, "Something went wrong with the Database Update!")
// });

app.use(methodOverride('_method'));

app.use(bodyParser.json());

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

//Ensure user is loggedin before viewing certain pages
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
}

app.use("/baby", require('./routes/baby'));

//************************
//APP ROUTES
//************************
// app.get("/", function(req,res){
//     if (req.isAuthenticated()) {
//         res.render('home');
//     } else {
//         res.render('index');
//     }
// });

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
