// ROUTES FOR OUR API
// =============================================================================
var express = require('express');  
var router = express.Router();

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

    .get(function(req, res) {
      ConfigSchema.findOne()
        .exec(function(err, config) {
          res.json({
            err: err,
            config: config
          });
        });
    });

module.exports = router;