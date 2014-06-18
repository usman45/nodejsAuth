// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash= require('connect-flash');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.db); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	//setup or express application 
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); //read cookies (needed for auth)
	app.use(express.bodyParser()); //get information from html forms

	//Set views path, template engine and default layout
    app.set('views', 'app/views');
	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({
		secret: 'ilovescotchscotchyscotchscotch'
	})); // session secret

	app.use(passport.initialize());
	app.use(passport.session()); // persistent login session
	app.use(flash()); //use connect-flash for flash messages stored in session
});


//routes
require('./app/routes.js')(app, passport); // load our toutes and pass in our app and fully configired passport

// launch ======================================================================
app.listen(port);

console.log('the app started on ' + port);