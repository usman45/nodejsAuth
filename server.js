var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash= require('connect-flash');

var configDB = require('./config/database.js');

mongoose.connect(configDB.db);

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	//setup or express application middleware
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());

	app.set('view engine', 'ejs');

	app.use(express.session({
		secret: 'ilovescotchscotchyscotchscotch'
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash());
});


//routes
require('./app/routes.js')(app, passport);

app.listen(port);

console.log('the app started on ' + port);