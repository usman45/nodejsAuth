module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	app.get('/login', function(req, res) {
		res.render('login.ejs', { 
			message: req.flash('loginMessage') 
		});
	});

	app.get('/signup', function(req, res) {
		res.render('signup.ejs', { 
			message: req.flash('signupMessage') 
		});
	});

	app.get('/profile', function(req, res) {
		res.render('profile.ejs', { 
			user: req.user 
		});
	});

	app.get('/logout', function(req, res) {
		res.logout();
		res.redirect('/');
	});

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated())
			return next();

		res.redirect('/');
	}

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

};