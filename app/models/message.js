var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema ({
	firstName : {type: String, lowercase: true, required: true},
	lastName : {type: String, lowercase: true, required: true},
	email: {type: String, required: true, lowercase: true},
	subject: {type: String, lowercase: true},
	message: {type: String}
});


module.exports = mongoose.model('Msg', messageSchema); 