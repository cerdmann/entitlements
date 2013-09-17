var db = require('./db.js');
var entitlementSchema = require('./schemas/entitlements.js')(db);
var Entitlement = db.model('entitlement', entitlementSchema);


var model = {
  get_all : function(deliver) {
    console.log('ENTITLEMENTS (model) - get_all');

    Entitlement.find(function (err, entitlements) {
      if(err) {
        console.log('Error: %s', JSON.stringify(err));
        deliver(JSON.stringify(err));
      }

      deliver(JSON.stringify(entitlements));
    });
  },
  get_individual : function (specificId, deliver) {
    console.log('ENTITLEMENTS (model) - get_individual: %s', specificId);
  
    deliver('');
  },
  add : function(request_params, deliver) {
    console.log('ENTITLEMENTS (model) - add');

    var required_field_errors = {}
    required_field_errors.message = 'Required field(s) missing';
    required_field_errors.fields = [];

    function addError(fieldName) {
      required_field_errors.fields.push(fieldName);
    }

    if (request_params.itemId === undefined) {
      addError("itemId");
    }

    if (request_params.title === undefined) {
      addError("title");
    }

    if(request_params.totalNumberOfUses === undefined) {
      addError("totalNumberOfUses");
    }

    if(request_params.timesUsed === undefined) {
      addError("timesUsed");
    }

    if(request_params.expiration === undefined) {
      addError("expiration");
    }

    if(request_params.expired === undefined) {
      addError("expired");
    }

    if(request_params.user === undefined) {
      addError("user");
    }

    if(required_field_errors.fields.length === 0) {
      var entitlement_data = {
        itemId: request_params.itemId,
        title: request_params.title,
        description: request_params.description,
        totalNumberOfUses: request_params.totalNumberOfUses,
        timesUsed: request_params.timesUsed,
        expiration: request_params.expiration,
        expired: request_params.expired,
        user: request_params.user
      }

      var new_entitlement = new Entitlement(entitlement_data);
      new_entitlement.save(function (error, data) {
        if (error) {
          console.log(error);
          deliver(JSON.stringify(error));
        }
        else {
          deliver('{}');
        }
      });
    }
    else {
      deliver(JSON.stringify(required_field_errors));
    }
  }
};

module.exports = model;


