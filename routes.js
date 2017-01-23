// ROUTES FOR OUR API
// =============================================================================
var express = require('express');  
var router = express.Router();              // get an instance of the express Router

var DataSense = require('./dataSchema');
var UserSchema = require('./userSchema');

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

router.route('/users')

    // create a user (accessed at POST http://localhost:8080/api/users)
    .post(function(req, res) {
        
        var user = new User();      // create a new instance of the user model
        user.uid = req.body.uid;  // set the users name (comes from the request)
        user.email = req.body.email;
        user.admin = req.body.admin;

        // save the user and check for errors
        user.save(function(err) {
                
            res.json({ 
              err: err,
              message: 'UserSchema created!' });
        });
        
    })

     // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        UserSchema.find(function(err, users) {
            if (err)
                res.send(err);

            res.json({
              err: err,
              users: users
            });
        });
    });

module.exports = router;