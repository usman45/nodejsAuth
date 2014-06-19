var mongoose = require('mongoose');
var bycrypt   = require('bcrypt-nodejs');

/**
* Validations
*/
 var validatePresenceOf = function(value) {
     // If you are authenticating by any of the oauth strategies, don't validate.
     return (this.provider && this.provider !== 'local') || (value && value.length);
 };

var UserSchema =  mongoose.Schema({
	local : {
		name: {
	        type: String,
	        //required: true
	    },
	    password: {
	        type: String,
	        required: true
	    },
	    email: {
	        type: String,
	        required: true,
	        match: [/.+\@.+\..+/, 'Please enter a valid email'],
	    },
	    username: {
	        type: String,
	        unique: true,
	        //required: true
	    },
	    roles: {
	        type: Array,
	        default: ['authenticated']
	    },
	    hashed_password: {
	        type: String,
	        validate: [validatePresenceOf, 'Password cannot be blank']
	    },
	    provider: {
	        type: String,
	        default: 'local'
	    },
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