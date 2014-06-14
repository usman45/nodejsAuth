var mongoose = require('mongoose');
var bycrypt = require('bycrypt-nodejs');

var UserSchema = mongoose.Schema({
	local : {
		email : String,
		passpwrd : String
	},
	facebook : {
		id : String,
		token : String,
		email : String,
		name : String

	},
	google : {
		id : String,
		token : String,
		email : String,
		name : String
	},
	twitter : {
		id : String,
		token : String,
		displayName : String,
		userName : String
	} 
});