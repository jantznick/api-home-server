const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local');
// const models = require('../DBmodels');
// var passport = require('passport');

const generateHash = (password) => {
	return bcrypt.hashSync(password, 8);
};

const isValidPassword = (password, hash) => {
	return bcrypt.compareSync(password, hash);
};

module.exports = (passport, user) => {
	var User = user;
	passport.use('local-signup', new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true // allows us to pass back the entire request to the callback
		},
		(req, email, password, done) => {
			User.findOne({
				where: {
					email: email
				}
			}).then((user) => {
				if (user) {
					return done(null, false, {
						message: 'That email is already taken'
					});
				} else {
					var userPassword = generateHash(password);
					var data =
						{
							email: email,
							password: userPassword,
							...req.body
						};
					User.create(data).then((newUser, created) => {
						if (!newUser) {
							return done(null, false);
						}
						if (newUser) {
							return done(null, newUser);
						}
					});
				}
			});
		}
	));

	//LOCAL SIGNIN
	passport.use('local-signin', new LocalStrategy(
		{
			// by default, local strategy uses username and password, we will override with email
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true // allows us to pass back the entire request to the callback
		},
		(req, email, password, done) => {
			var User = user;
			User.findOne({
				where: {
					email: email
				}
			}).then((user) => {
				if (!user) {
					return done(null, false, {
						message: 'Email does not exist'
					});
				}
				if (!isValidPassword(password, user.password)) {
					return done(null, false, {
						message: 'Incorrect password.'
					});
				}
				var userinfo = user.get();
				return done(null, userinfo);
			}).catch((err) => {
				console.log("Error:", err);
				return done(null, false, {
					message: 'Something went wrong with your Signin'
				});
			});
		}
	));

	//serialize
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	// deserialize user
	passport.deserializeUser((id, done) => {
		User.findByPk(id).then((user) => {
			if (user) {
				done(null, user.get());
			} else {
				done(user.errors, null);
			}
		});
	});
};
