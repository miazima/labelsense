// ROUTES FOR OUR API
// =============================================================================
var express = require('express');  
const fileSystem = require('fs');
var csv = require('csv');
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

      DataSchema.find({ prj: req.query.prj }).exec(function(err, docs) {
        var labelData = [];
        for (var i = 0; i < docs.length; i++) {
          for (var j = 0; j < docs[i].data.length; j++) {
            labelData.push({
              uid: docs[i].uid,
              prj: docs[i].prj,
              docID: docs[i].data[j].docID,
              labels: docs[i].data[j].labels.join()
            });
          }
        }

        var stringifier = csv.stringify(labelData, { header: true }, function(err, output) {
          var filename = 'userData_' + req.query.prj + '.csv';
          res.writeHead(200, {
          "Content-Disposition" : "attachment; filename=" + filename});
          res.write(output);
          res.end();
        });

        
      });

    });

module.exports = router;