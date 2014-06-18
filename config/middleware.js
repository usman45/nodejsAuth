/**
 * Generic require login routing middleware
 */
 exports.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated())
		return next();

	res.redirect('/');
}