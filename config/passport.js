var LocalStrategy = require('passport-local').Strategy;

var User =  require('../app/models/user');

modeule.exports = function(passprt) {
	passprt.serializeUser(function(user, done) {
		done(null, user.id);
	});
};