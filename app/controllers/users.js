exports.homePage = function(req, res) {
	res.render('index.ejs');
}

exports.login = function(req, res) {
	res.render('login.ejs', {
		message : req.flash('loginMessage')
	});
}

exports.signup = function(req, res) {
	res.render('signup.ejs', {
		message : req.flash('signupMessage')
	});
}

exports.userProfile = function(req, res) {
	res.render('profile.ejs', { 
		user: req.user // get the user out of session and pass to template
	});
}

exports.logout = function(req, res) {
	req.logout();
    res.redirect('/');
}