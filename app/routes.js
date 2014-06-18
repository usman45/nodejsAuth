module.exports = function(app, passport, auth) {

	var authe = require('../config/middleware.js');
	var users = require('./controllers/users');

	app.get('/', users.homePage);
	app.get('/login', users.login);
	app.get('/signup', users.signup);
	app.get('/profile', authe.isLoggedIn, users.userProfile);
	app.get('/logout', users.logout);

	
	app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
	app.get('/auth/facebook/callback', passport.authenticate('facebook',{
		successRedirect : 'profile',
		failureRedirect : '/'
	}));

	
	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// process the signup form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

};