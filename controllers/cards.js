var express = require('express');
var cardRouter = express.Router();


var CardQuery = require('../db/cardQuery');
var query = new CardQuery(); 

// get all
cardRouter.get('/', function(req, res) {
  console.log("route being hit")
  query.all(function(results){
    res.json(results);
  });
});

module.exports = cardRouter;