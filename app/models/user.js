var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


//Mongo db schema controls how data is organized with the DB
//UserSchema determines what attributes a User has in the DB
var UserSchema = new Schema({
	username: {type: String, lowercase: true, required: true, unique: true},
	password: {type: String, required: true},
	email: {type: String, required: true, lowercase: true, unique: true},
	msg: {type: String}
});


UserSchema.pre('save', function(next){
	var user = this;
	
	bcrypt.hash(user.password, null, null, function(err, hash){
		if(err) return next(err);
		
		user.password = hash;
		next();
	})
})

UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
} 

//exporting to the server file, naming the model "User", with the data from the schema, UserSchema
//the server will now have access to the model under the name User
module.exports = mongoose.model('User', UserSchema);  
