var mongoose = require('mongoose');
var ping = require('./lib/ping');
var config = require('./config.json');
var Request = mongoose.model('Request');

var worker = {
  run: function() {
    var pingEndpoint = function() {
      var date = new Date();
      config.endpoints.forEach(endpoint => {
        ping.ms(endpoint.url, (err, ms) => {
          var request = new Request({
            date: date,
            url: endpoint.url,
            ms: ms
          });
          request.save();
        });
      });
    };

    pingEndpoint();
    setInterval(pingEndpoint, config.interval);
  }
};

module.exports = worker;
