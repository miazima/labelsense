var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var projectSchema   = new Schema({
    project_name: {
    	type: String,
    	index: { unique: true }
    },
    tokens: Array,
    uid: String,
    created_time: {
    	type: Date,
    	default: Date.now()
    },
    updated_time: {
    	type: Date,
    	default: null
    },
    labels: {
    	type: Array,
    	default: []
    },
    project_settings: {
    	type: Object,
    	default: null
    }
});

module.exports = mongoose.model('Project', projectSchema);