var mongoose = require('mongoose');
var bycrypt = require('bycrypt-nodejs');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	local : {
		email : String,
		passpword : String
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

UserSchema.methods.generateHash = function(passpword) {
	return bycrypt.hashSync(passpword, bycrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassord = function(passpword) {
	return bycrypt.compareSync(passpword, this.local.password);
};

mongoose.exports = mongoose.model('User', UserSchema);