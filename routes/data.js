// ROUTES FOR OUR API
// =============================================================================
var express = require('express');  
var router = express.Router();              // get an instance of the express Router
var multer = require('multer');
const fileSystem = require('fs');
const path = require('path');
const readline = require('readline');


var upload = multer({
  dest: __dirname + '/../app/data/',
}).single('file');

var UserSchema = require('../schemas/userSchema');
var ProjectSchema = require('../schemas/projectSchema');

// Applying middleware to all routes in the router
router.use(upload, function (req, res, next) {
	var uid = req.query.uid || req.body.uid;
	UserSchema.find({ uid: uid })
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

        var uploadPath = path.join(__dirname, '/../app/data/', req.body.uid);

        if (!fileSystem.existsSync(uploadPath)){
					fileSystem.mkdirSync(uploadPath);
				}

				uploadPath = path.join(uploadPath, req.file.originalname);
        fileSystem.rename(req.file.path, uploadPath, function (err) {
				  if (err) res.json({ 
              message: 'File not uploaded!' });
				});

				const rl = readline.createInterface({
		      input: fileSystem.createReadStream(uploadPath)
		    });
			
				var tokens = [];
		    rl.on('line', function (line) {
		      tokens.push(line);
		    }).on('close', function() {
	        var project = new ProjectSchema();
	        project.project_name = req.body.prj;
	      	  project.uid = req.body.uid;
						project.tokens = tokens; 

	        project.save(function(err) {
          	 

						res.json({
							err: err,
            	tokens: tokens,
              message: 'ProjectSchema created!' 
            });
        	});

		    	
		    });
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