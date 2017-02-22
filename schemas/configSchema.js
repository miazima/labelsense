var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var configSchema   = new Schema({
    prj: {
    	type: String
    },
    tokens: Array,
    labels: {
    	type: [String],
    	default: []
    },
    settings: {
    	type: Object,
    	default: null
    }
});

module.exports = mongoose.model('Config', configSchema);