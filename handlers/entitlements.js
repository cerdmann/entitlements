var restify = require('restify');
var model = require('./models/entitlements.js');

var handler = {
  getAllEntitlements: function(req, res, next) {
    console.log('ENTITLEMENTS (handler) - GET all');

    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    function receiveResponse(response) {
      res.send(response);
      return next();
    }

    model.get_all(receiveResponse);
  },
  getSpecificEntitlement: function(req, res, next) {
    var specificId = req.params.specificId;
    console.log('ENTITLEMENTS (handler) - GET individual (%s)', specificId);

    function receiveResponse(response) {
      res.send(response);
      return next();            
    }

    model.get_individual(specificId, receiveResponse);    
  },
  postEntitlement: function(req, res, next) {
      console.log('ENTITLEMENTS (handler) - POST');

      function receiveResponse(response) {
        if (response.length > 2) {
          return next(new restify.InvalidArgumentError(response));
        }
        res.send(201);
        return next();
      }

      model.add(req.params, receiveResponse);
  }
};
  
module.exports = handler;
