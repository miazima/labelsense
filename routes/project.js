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
var ConfigSchema = require('../schemas/configSchema');
var ProjectSchema = require('../schemas/projectSchema');

// Applying middleware to all routes in the router
router.use(upload, function (req, res, next) {
	var uid = req.query.uid || req.body.uid;
	UserSchema
		.find({ uid: uid })
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
	        project.prj = req.body.prj;
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
        ProjectSchema.find({ uid: req.query.uid }, function(err, projects) {
            res.json({
              err: err,
              projects: projects
            });
        });
    })

    .delete(function(req, res) {
    	ProjectSchema.find({ prj: req.query.prj, uid: req.query.uid })
    		.remove(function(err, prj) {
    			res.json({
    				err: err,
    				meesage: 'Successfully deleted!'
    			});
    		});
    });


router.route('/settings')

    .post(function(req, res) {
			ProjectSchema.findOneAndUpdate({ uid: req.body.uid, prj: req.body.prj }, 
				{ $set: { 
					settings: req.body.set, 
					labels: req.body.labels,
					updated: Date.now()
					} 
				},
				function(err) {
						res.json({
							err: err,
							message: 'Project settings were saved.'
						});
				});
    })

    .get(function(req, res) {
        ProjectSchema
        	.findOne({ uid: req.query.uid, prj: req.query.prj })
        	.exec(function(err, prj) {
						res.json({
							err: err,
							prj: prj
            });
        	});
    });

router.route('/defaultprj')

	.post(function(req, res) {
		// Save the project as default
		var defaultprj = req.body.prj;
		UserSchema.findOneAndUpdate({ uid: req.body.uid }, { $set: { prj: defaultprj } }, function(err, res) {
			
		});
		// Retrieve the project settings
		ProjectSchema
			.findOne({ prj: defaultprj })
			.exec(function(err, prj) {
				if (!prj) return;

				// Set the project config as the default settings
				ConfigSchema.findOne(function(err, config) {
					if (!config) {
						var config = new ConfigSchema();
						config.save();
					}


					ConfigSchema.findOneAndUpdate({},
						{ $set: {
							prj: prj.prj,
							tokens: prj.tokens,
							labels: prj.labels,
							settings: prj.settings
						} 
					}, function(err) {
							res.json({
								err: err,
								message: 'Default configuration was saved.'
							});
					});
				});
			});
	
	});

module.exports = router;