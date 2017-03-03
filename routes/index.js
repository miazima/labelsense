var express = require('express');
var router = express.Router();

router.use(require('./users'));
router.use(require('./config'));
router.use(require('./data'));
router.use(require('./project'));

module.exports = router