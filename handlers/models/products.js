var schema = require('./schemas/products.js');
var db = require('./db.js').products_db;
var required_field_checker = require('./required_field_checker.js');
var formatter = require('./formatters/products.js');
var common_callback = require('./common_callback.js');

function checkForDuplicate(product, cb) {
  db.model('product', schema).find({ productId: product.productId}, cb);
}


var model = {
  get_all : function(cb) {
    console.log('PRODUCTS (model) - get_all');

    db.model('product', schema).find(common_callback('get_all', formatter.list, cb).deliver);
  },
  get_individual : function (specificId, cb) {
    console.log('PRODUCTS (model) - get_individual: (%s)', specificId);

    db.model('product', schema).findById(specificId, common_callback('get_individual',  formatter.individual, cb).deliver);
  },
  delete: function(specificId, cb) {
    console.log('PRODUCTS (model) - delete: (%s)', specificId);

    db.model('product', schema).findByIdAndRemove(specificId, common_callback('delete', formatter.null, cb).deliver);
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

      function duplicateCheckCallback(error, doc) {
        if(error) {
          cb(error);
        }
        else {
          console.log('DuplicateCheckCallback error routine: %s', JSON.stringify(doc));
          if (doc.length === 0) {
            var Product = db.model('product', schema);

            var new_product = new Product(product_data);
            new_product.save(common_callback('add', formatter.null, cb).deliver);
          }
          else {
            cb("item exists");
          }
        }
      }

      checkForDuplicate(product_data, duplicateCheckCallback);


    }

    required_field_checker.check(request_params, required_fields, fields_missing, fields_complete);
  }
};

module.exports = model;
