module.exports = function(app, passport, auth) {

	//load dependecies what we will need
	var authe = require('../config/middleware.js');
	var users = require('./controllers/users');

	// all the get requests, things we need from server
	app.get('/', users.homePage);
	app.get('/login', users.login);
	app.get('/signup', users.signup);
	app.get('/profile', authe.isLoggedIn, users.userProfile); // we will use route middleware to verify this (the isLoggedIn function)
	app.get('/logout', users.logout);
	app.get('/default', users.render);

	
	// authenticate me via facebook, here are my requests
	app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
	app.get('/auth/facebook/callback', passport.authenticate('facebook',{
		successRedirect : 'profile',
		failureRedirect : '/'
	}));

	// server responds to our get requests
	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/default', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

};