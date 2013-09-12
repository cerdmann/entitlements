module.exports = function (db ) {
  db = db || require('./db.js');
  var entitlementSchema = require('./schemas/entitlements.js')(db);
  var Entitlement = db.model('Entitlement', entitlementSchema);

  return {
    get_all : function() {
      console.log('getting all for ENTITLEMENTS model');

      Entitlement.find(function (err, entitlements) {
        return entitlements;
      });
    },
    add : function(request_params) {
      console.log('adding ENTITLEMENT model');
      console.log('title: %s', request_params.title);
      console.log(request_params);

      var required_field_errors = []

      if (request_params.title === undefined) {
        required_field_errors.push("title");
      }

      if(request_params.totalNumberOfUses === undefined) {
        required_field_errors.push("totalNumberOfUses");
      }

      var entitlement_data = {
        title: request_params.title,
        totalNumberOfUses: request_params.totalNumberOfUses,
      }

      var new_entitlement = new Entitlement(entitlement_data);
      new_entitlement.save(function (error, data) {
        if (error) {
          return JSON.stringify(error.errors);
        }
        
        return;
      });
    },
  };
};


