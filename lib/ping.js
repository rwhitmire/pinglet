var request = require('request');

var ping = {
  ms: function(url, callback) {
    var start = new Date();

    request
      .get(url)
      .on('response', function(response) {
        // todo: handle error codes

        var end = new Date();
        var diff = end - start;
        callback(null, diff);
      });
  }
};

module.exports = ping;
