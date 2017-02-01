var express    = require('express');        // call express
var app        = express();                 // define app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/labelsense');



app.use(express.static(__dirname + '/app'));
var router = require('./routes');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.get('/*', function (req, res) {
	res.sendFile(__dirname + '/app' + '/index.html');
})

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8000;        // set our port



// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);