'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '做好做滿' , projectName: 'Leave'});
});

module.exports = router;
