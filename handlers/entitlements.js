var restify = require('restify');
var model = require('./models/entitlements.js');

module.exports = function () {
  return {
    getEntitlements : function(req, res, next) {
      console.log('getting ENTITLEMENTS handler');

      res.header("Access-Control-Allow-Origin", "*"); 
      res.header("Access-Control-Allow-Headers", "X-Requested-With");

      //var entitlements = model.get_all();

      //res.send(entitlements);
      return next();
    },
    postEntitlement : function(req,res,next) {
      console.log('posting ENTITLEMENT handler');

      var new_entitlement = model.add(req.params);

      if (new_entitlement.length > 0) {
        return next(new restify.InvalidArgumentError(JSON.stringify(new_entitlement)));
      }
      res.send(201);
      return next();
    },
  };
};
