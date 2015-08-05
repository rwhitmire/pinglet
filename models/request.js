var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
  date: Date,
  ms: {type: Number},
  url: String
});

mongoose.model('Request', RequestSchema);
