var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
    uid: {
    	type: String,
    	index: { unique: true }
    },
    email: {
    	type: String,
    	index: { unique: true }
    },
    admin: Boolean,
    prj: String
});

module.exports = mongoose.model('User', userSchema);