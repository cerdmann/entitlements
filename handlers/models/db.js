var mongoose = require('mongoose');

function setupConnectionTo(db_name) {
  var config_file_name = './dbconfig_' + db_name;
  var config = require(config_file_name);
  var mongo_uri = config.credentials.mongoose_auth_local;

  var connection = mongoose.createConnection(mongo_uri);

  connection.once('error', console.error.bind(console, 'connection error:'));

  connection.once('open', function () { 
    console.log('Mongoose connection up and running for: %s', db_name);  
  });

  return connection;
}

var db_entitlements = setupConnectionTo('entitlements');
var db_products = setupConnectionTo('products');

module.exports = {
  entitlements_db: db_entitlements,
  products_db: db_products
}
