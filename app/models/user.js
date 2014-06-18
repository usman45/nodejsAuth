var mongoose = require('mongoose');
var bycrypt   = require('bcrypt-nodejs');

var UserSchema =  mongoose.Schema({
	local : {
		email : String,
		password : String
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

// generating a hash
UserSchema.methods.generateHash = function(password) {
	return bycrypt.hashSync(password, bycrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
	return bycrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);