const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	path = require('path'),
	users = require('../data/');

const bcrypt = require('bcrypt-nodejs');

let configurePassport = (passport) => {
	// local strategy to verify username ans password
	passport.use(new LocalStrategy(
		(username, password, done) => {
			console.log(`username: ${username}`);
			console.log(`password: ${password}`);
			let res = users.verifyUserPass(username, password);
			var hash = bcrypt.hashSync(password);
			console.log(`password after hash: ${hash}`);
			if (res.status)
				return done(null, res.message);

			return done(null, false, {
				message: res.message
			});
		}
	));

	passport.serializeUser((user, done) => {
		done(null, user);
	});

	passport.deserializeUser((user, done) => {
		let auth = user.split(' ');
		if (auth.length != 2)
			return done(null, false, {
				message: "Cookie is not valid"
			});

		let username = auth[0];
		let password = auth[1];

		let res = users.verifyUserPass(username, password);

		if (res.status)
			return done(null, res.message);

		return done(null, false, {
			message: res.message
		});
	});
}

configurePassport(passport);

let configureRoutes = (app) => {

	app.use(passport.initialize());
	app.use(passport.session());


	app.post('/login', passport.authenticate('local', {
		successRedirect: '/private',
		failureRedirect: '/',
		failureFlash: true,
		successFlash: 'Welcome!'
	}));

	app.get('/private', (req, res) => {

		if (req.isAuthenticated()) {
			let username = req.user.split(' ')[0];
			let userInfo = users.getUserById(username);
			res.render('private.handlebars', {
				username: username,
				alias: userInfo.alias,
				firstName: userInfo.firstName,
				lastName: userInfo.lastName,
				profession: userInfo.profession,
				bio: userInfo.bio
			});
			//console.log('username: ' + req.user.split(' ')[0]);
		} else {
			res.redirect('/login');
		}

	})

	app.get('/login', (req, res) => {

		if (!req.isAuthenticated()) {
			if (req.session.flash && req.session.flash.error) {
				console.log("error: " + req.session.flash.error.slice(-1)[0]);
				res.render('login.handlebars', {
					error: true,
					message: req.session.flash.error.slice(-1)[0]
				});
				return
			}
			res.render('login.handlebars', {
				error: false
			});
		} else {
			res.redirect('/private/');
		}
	});


	app.get('/', (req, res) => {
		// protect endpoints
		console.log("authenticated status :" + req.isAuthenticated());
		console.log(req.session);
		if (req.isAuthenticated()) {
			res.redirect('/private/');
		} else {
			res.redirect('/login/')
		}
	})
}

module.exports = configureRoutes