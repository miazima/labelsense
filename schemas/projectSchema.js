var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var projectSchema   = new Schema({
    prj: {
    	type: String
    },
    tokens: [String],
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
    	default: [String]
    },
    project_settings: {
    	type: Object,
    	default: null
    }
});

projectSchema.index({ prj: 1, uid: 1 }, { unique: true });

module.exports = mongoose.model('Project', projectSchema);