var express = require('express');
var router = express.Router();
var config = require('./../config.json');
var mongoose = require('mongoose');
var moment = require('moment');
var _ = require('underscore');
var Request = mongoose.model('Request');

router.get('/', function(req, res, next) {
  var promises = [];

  config.endpoints.forEach(endpoint => {
    var startDate = moment().subtract(1, 'month').toDate();
    
    var promise = Request
      .find({url: endpoint.url, date: {$gt: startDate}})
      .select('date ms -_id')
      .sort('date')
      .exec();

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

  promise.catch(err => {
    next(err);
  });
});

module.exports = router;
