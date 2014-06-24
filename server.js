// set up ======================================================================
// get all the tools we need
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var app            = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash= require('connect-flash');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.db); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT


//Set views path, template engine and default layout
app.set('views', 'app/views');
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(session({secret: 'ilovescotchscotchyscotchscotch'}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login session
app.use(flash()); //use connect-flash for flash messages stored in session

//routes
require('./app/routes.js')(app, passport); // load our toutes and pass in our app and fully configired passport

// launch ======================================================================
app.listen(port);

console.log('the app started on ' + port);