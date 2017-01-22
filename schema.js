// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var dataSchema   = new Schema({
    content: String,
    labels: Array,
    user: String,
    index_start: Number,
    index_end: Number
});

module.exports = mongoose.model('LabelSense', dataSchema);