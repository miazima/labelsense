var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
    uid: {
    	type: String,
    	unique: true,
        required: true
    },
    email: {
    	type: String,
        unique: true,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    prj: String
});

module.exports = mongoose.model('User', userSchema);