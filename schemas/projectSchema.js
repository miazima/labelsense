var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var projectSchema   = new Schema({
    project_name: {
    	type: String,
    	index: { unique: true }
    },
    uid: String,
    created_time: Date,
    updated_time: Date,
    labels: Array,
    project_settings: Object
});

module.exports = mongoose.model('Project', projectSchema);