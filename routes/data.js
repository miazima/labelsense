// ROUTES FOR OUR API
// =============================================================================
var express = require('express');  
var router = express.Router();              // get an instance of the express Router

var UserSchema = require('../schemas/userSchema');
var DataSchema = require('../schemas/dataSchema');

// Applying middleware to all routes in the router
router.use(function (req, res, next) {
	UserSchema.find({ email: req.query.email })
						 .where ('admin').equals(true)
						 .select('uid email admin')
						 .exec(function(err, user) {
						 		if (err || !user.length) res.json({ message: 'Authorization failed!' });
						 		else next();
						 });
})

router.route('/project')

    // create a project (accessed at POST http://localhost:8080/api/projects)
    .post(function(req, res) {
        var project = new DataSchema();      // create a new instance of the project model
        project.uid = req.body.uid;  // set the projects name (comes from the request)
        project.email = req.body.email;
        project.admin = req.body.admin;

        // save the project and check for errors
        project.save(function(err) {
                
            res.json({ 
              err: err,
              message: 'DataSchema created!' });
        });
    })

     // get all the projects (accessed at GET http://localhost:8080/api/projects)
    .get(function(req, res) {
        DataSchema.find(function(err, projects) {
            res.json({
              err: err,
              projects: projects
            });
        });
    });

module.exports = router;