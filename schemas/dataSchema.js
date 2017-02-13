var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var dataSchema   = new Schema({
    prj: String,
    docID: Number,
    labels: Array,
    uid: String,
    index_start: {
    	type: Number,
    	default: null
    },
    index_end: {
    	type: Number,
    	default: null
    },
});

module.exports = mongoose.model('Data', dataSchema);