var schema = require('./schemas/products.js');
var db = require('./db.js').products_db;
var required_field_checker = require('./required_field_checker.js');

var callback = function(requestName, cb) {
  return {
    deliver: function (error, result) {
      if(error) {
        console.log('%s, Error: %s', requestName, JSON.stringify(error));
        cb(JSON.stringify(error));
      }
      else {
        cb(null, JSON.stringify(result));
      }
    }
  };
};

var model = {
  get_all : function(cb) {
    console.log('PRODUCTS (model) - get_all');

    db.model('product', schema).find(callback('get_all', cb).deliver);
  },
  get_individual : function (specificId, cb) {
    console.log('PRODUCTS (model) - get_individual: (%s)', specificId);

    db.model('product', schema).findById(specificId, callback('get_individual', cb).deliver);
  },
  delete: function(specificId, cb) {
    console.log('PRODUCTS (model) - delete: (%s)', specificId);

    db.model('product', schema).findByIdAndRemove(specificId, callback('delete', cb).deliver);
  },
  add : function(request_params, cb) {
    console.log('PRODUCTS (model) - add');

    var required_fields = ['productId', 'name'];

    function fields_missing(error) {
      cb(error);
    }

    function fields_complete() {
      var product_data = {
        productId: request_params.productId,
        name: request_params.name,
        description: request_params.description
      };

      var Product = db.model('product', schema);

      var new_product = new Product(product_data);
      new_product.save(callback('add', cb).deliver);
    }

    required_field_checker.check(request_params, required_fields, fields_missing, fields_complete);
  }
};

module.exports = model;
