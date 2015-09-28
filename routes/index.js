var express = require('express');
var router = express.Router();
var moment = require('moment');
var constants = require('../lib/constants')
var competitionService = require('../lib/competition-service')
/* GET home page. */
router.get('/', function(req, res) {	
  res.render('index', {
  	 	title: 'Express',
  	 	today : moment(Date.now()).format(constants.gridHeaderDateFormat),
  	 	competitions : competitionService.list()
  	 });
});

module.exports = router;

