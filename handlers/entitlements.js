var restify = require('restify');
var model = require('./models/entitlements.js');

var handler = {
  getEntitlements: function(req, res, next) {
      console.log('getting ENTITLEMENTS handler');

      res.header("Access-Control-Allow-Origin", "*"); 
      res.header("Access-Control-Allow-Headers", "X-Requested-With");

      function receiveResponse(response) {
        console.log(response);
        res.send(response);
        return next();
      }

      model.get_all(receiveResponse);
  },
  postEntitlement: function(req, res, next) {
      console.log('posting ENTITLEMENT handler');

      function receiveResponse(response) {
        if (response.length > 2) {
          return next(new restify.InvalidArgumentError(JSON.stringify(response)));
        }
        res.send(201);
        return next();
      }

      model.add(req.params, receiveResponse);
  }
};
  
module.exports = handler;
