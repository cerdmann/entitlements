var schema = require('./schemas/entitlements.js');
var db = require('./db.js').entitlements_db;
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
    console.log('ENTITLEMENTS (model) - get_all');

    db.model('entitlement', schema).find(callback('get_all', cb).deliver);
  },
  get_individual : function (specificId, cb) {
    console.log('ENTITLEMENTS (model) - get_individual: (%s)', specificId);

    db.model('entitlement', schema).findById(specificId, callback('get_individual', cb).deliver);
  },
  delete: function(specificId, cb) {
    console.log('ENTITLEMENTS (model) - delete: (%s)', specificId);

    db.model('entitlement', schema).findByIdAndRemove(specificId, callback('delete', cb).deliver);
  },
  add : function(request_params, cb) {
    console.log('ENTITLEMENTS (model) - add');

    var required_fields = ['productId', 'title', 'totalNumberOfUses', 'timesUsed', 'expiration', 'expired', 'user'];

    function fields_missing(error) {
      cb(error);
    }

    function fields_complete() {
      var entitlement_data = {
        productId: request_params.productId,
        title: request_params.title,
        description: request_params.description,
        totalNumberOfUses: request_params.totalNumberOfUses,
        timesUsed: request_params.timesUsed,
        expiration: request_params.expiration,
        expired: request_params.expired,
        user: request_params.user
      };

      var Entitlement = db.model('entitlement', schema);

      var new_entitlement = new Entitlement(entitlement_data);
      new_entitlement.save(callback('add', cb).deliver);
    }

    required_field_checker.check(request_params, required_fields, fields_missing, fields_complete);
  }
};

module.exports = model;
