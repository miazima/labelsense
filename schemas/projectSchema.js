var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var projectSchema   = new Schema({
    prj: {
    	type: String
    },
    tokens: Array,
    uid: String,
    created: {
    	type: Date,
    	default: Date.now()
    },
    updated: {
    	type: Date,
    	default: null
    },
    labels: {
    	type: [String],
    	default: []
    },
    settings: {
    	type: Object,
    	default: null
    }
});

projectSchema.index({ prj: 1, uid: 1 }, { unique: true });

module.exports = mongoose.model('Project', projectSchema);