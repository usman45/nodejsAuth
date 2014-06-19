exports.homePage = function(req, res) {
	res.render('users/');
}

exports.login = function(req, res) {
	res.render('users/login.ejs', {
		message : req.flash('loginMessage')
	});
}

exports.signup = function(req, res) {
	res.render('users/signup.ejs', {
		message : req.flash('signupMessage')
	});
}

exports.userProfile = function(req, res) {
	res.render('users/profile.ejs', { 
		user: req.user // get the user out of session and pass to template
	});
}

exports.logout = function(req, res) {
	req.logout();
    res.redirect('/');
}