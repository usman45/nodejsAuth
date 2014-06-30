//Load dependencies
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');

// load User model
var User =  require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});


	passport.use(new FacebookStrategy(
		{
			clientID : configAuth.facebookAuth.clientID,
			clientSecret : configAuth.facebookAuth.clientSecret,
			callbackURL : configAuth.facebookAuth.callbackURL
		},
		function(token, refreshToken, profile, done) {
			process.nextTick(function() {
				User.findOne({'facebook.id' : profile.id}, function(err, user) {
					if(err) 
						return done(err);

					if(user) {
						return done(null, user);
					} else {
						//add new user to the model alongwith attributes
						var newUser = new User();
						
						newUser.facebook.id = profile.id;
						newUser.local.token = token;
						newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
						newUser.facebook.email = profile.emails[0].value;

						newUser.save(function(err) {
							if(err)
								throw err;
							return done(null, newUser);
						});
					}

				}); 
			});	
		}
	));

	// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'
	passport.use('local-login', new LocalStrategy(
		// by default, local strategy uses username and password, we will override with email
		{
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback : true // allows us to pass back the entire request to the callback	
		},
		function(req, email, password, done) {
			// find a user whose email is the same as the forms email
			// we are checking to see if the user trying to login already exists
	        User.findOne({ 'local.email' :  email }, function(err, user) {
	            // if there are any errors, return the error before anything else
	            if (err)
	                return done(err);

	            // if no user is found, return the message
	            if (!user)
	                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

				// if the user is found but the password is wrong
	            if (!user.validPassword(password))
	                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

	            // all is well, return successful user
	            return done(null, user);
	        });

    }));
	
	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'
	passport.use('local-signup', new LocalStrategy(
		{
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback : true	
		},
		function(req, email, password, done) {
			process.nextTick(function() {
				// find a user whose email is the same as the forms email
				// we are checking to see if the user trying to login already exists
				User.findOne({'local.email' : email}, function(err, user) {
					if(err) 
						return done(err);

					if(user) {
						return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
					} else {
						var newUser = new User();
						// set the user's local credentials
						newUser.local.email = email;
						newUser.local.password = newUser.generateHash(password);

						newUser.save(function(err) {
							if(err)
								throw err;
							return done(null, newUser);
						});
					}

				}); 
			});	
		}
	));		
};