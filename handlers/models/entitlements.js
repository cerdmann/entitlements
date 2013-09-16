var db = require('./db.js');
var entitlementSchema = require('./schemas/entitlements.js')(db);
var Entitlement = db.model('entitlement', entitlementSchema);


var model = {
  get_all : function(deliver) {
    console.log('getting all for ENTITLEMENTS model');

    Entitlement.find(function (err, entitlements) {
      if(err) {
        console.log('Error: %s', JSON.stringify(err));
        deliver(JSON.stringify(err));
      }

      deliver(JSON.stringify(entitlements));
    });
  },
  add : function(request_params, deliver) {
    console.log('adding ENTITLEMENT model');

    var required_field_errors = []

    if (request_params.itemId === undefined) {
      required_field_errors.push("itemId");
    }

    if (request_params.title === undefined) {
      required_field_errors.push("title");
    }

    if(request_params.totalNumberOfUses === undefined) {
      required_field_errors.push("totalNumberOfUses");
    }

    if(request_params.timesUsed === undefined) {
      required_field_errors.push("timesUsed");
    }

    if(request_params.expiration === undefined) {
      required_field_errors.push("expiration");
    }

    if(request_params.expired === undefined) {
      required_field_errors.push("expired");
    }

    if(required_field_errors.length === 0) {
      var entitlement_data = {
        itemId: request_params.itemId,
        title: request_params.title,
        description: request_params.description,
        totalNumberOfUses: request_params.totalNumberOfUses,
        timesUsed: request_params.timesUsed,
        expiration: request_params.expiration,
        expired: request_params.expired
      }

      var new_entitlement = new Entitlement(entitlement_data);
      new_entitlement.save(function (error, data) {
        if (error) {
          console.log(error);
          deliver(JSON.stringify(error.errors));
        }
        deliver('{}');
      });
    }
    else {
      deliver(JSON.stringify(required_field_errors));
    }
  }
};

module.exports = model;


