// ROUTES FOR OUR API
// =============================================================================
var express = require('express');  
var router = express.Router();

var DataSchema = require('../schemas/dataSchema');

router.route('/label')

    .post(function(req, res) {
        var label = new DataSchema();
        label.prj = req.body.prj;
        label.uid = req.body.uid;
        label.data = req.body.data;
        // label.settings = req.body.settings;

        // save the label and check for errors
        label.save(function(err) {
                
            res.json({ 
              err: err,
              message: 'DataSchema saved!' });
        });
    })

    .get(function(req, res) {
      DataSchema.findOne()
        .exec(function(err, label) {
          res.json({
            err: err,
            label: label
          });
        });
    });

module.exports = router;