// ROUTES FOR OUR API
// =============================================================================
var express = require('express');  
var router = express.Router();              // get an instance of the express Router

var ConfigSchema = require('../schemas/configSchema');

router.route('/config')

    .post(function(req, res) {
        var config = new ConfigSchema();
        config.prj = req.body.prj;
        config.tokens = req.body.tokens;
        config.labels = req.body.labels;
        config.settings = req.body.settings;

        // save the config and check for errors
        config.save(function(err) {
                
            res.json({ 
              err: err,
              message: 'ConfigSchema saved!' });
        });
    })

     // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        ConfigSchema.find(function(err, config) {
            if (err)
                res.send(err);

            res.json({
              err: err,
              config: config
            });
        });
    });

module.exports = router;