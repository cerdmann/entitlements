var mongoose = require('mongoose');
var config = require('./dbconfig');

var mongoUri = config.credentials.mongoose_auth_local;

mongoose.connect(mongoUri);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('Mongoose connection up and running');
});

module.exports = mongoose;
