var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var dataSchema   = new Schema({
    uid: String,
    prj: String,
    data: {
        type: [{
            docID: Number,
            labels: {
                type: [String],
                default: []
            },
            index_start: {
                type: Number,
                default: null
            },
            index_end: {
                type: Number,
                default: null
            }
        }]
    }
});

dataSchema.index({ prj: 1, uid: 1 }, { unique: true });

module.exports = mongoose.model('Data', dataSchema);
