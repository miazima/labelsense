// ROUTES FOR OUR API
// =============================================================================
var express = require('express');  
var router = express.Router();              // get an instance of the express Router

var UserSchema = require('../schemas/userSchema');
var ProjectSchema = require('../schemas/projectSchema');

// Applying middleware to all routes in the router
router.use(function (req, res, next) {
	UserSchema.find({ uid: req.query.uid })
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
        var project = new ProjectSchema();      // create a new instance of the project model
        console.log(req.body.file);
        // project.uid = req.body.uid;  // set the projects name (comes from the request)
        // project.email = req.body.email;
        // project.admin = req.body.admin;

        // // save the project and check for errors
        // project.save(function(err) {
                
            res.json({ 
              message: 'ProjectSchema created!' });
        // });
    })

     // get all the projects (accessed at GET http://localhost:8080/api/projects)
    .get(function(req, res) {
        ProjectSchema.find(function(err, projects) {
            res.json({
              err: err,
              projects: projects
            });
        });
    });

module.exports = router;