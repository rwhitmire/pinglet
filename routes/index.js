var express = require('express');
var router = express.Router();
var config = require('./../config.json');
var mongoose = require('mongoose');

var Request = mongoose.model('Request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var promises = [];

  config.endpoints.forEach(endpoint => {
    var promise = Request.find({url: endpoint.url}).select('date ms -_id').exec();
    promises.push(promise);
  });

  var promise = Promise.all(promises);

  promise.then((args) => {
    var endpoints = config.endpoints.map((endpoint, index) => {
      return {
        name: endpoint.name,
        url: endpoint.url,
        data: args[index]
      };
    });

    var context = {
      endpoints: endpoints
    };

    res.render('index', context);
  });
});

module.exports = router;
