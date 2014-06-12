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
		res.render('signup.ejs', { 
			user: req.user 
		});
	});

	app.get('/logout', function(req, res) {
		res.logout();
		res.redirect('/');
	});

};