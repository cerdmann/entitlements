var restify = require('restify');
var model = require('./models/entitlements.js');

var handler = {
  getAllEntitlements: function(req, res, next) {
    console.log('ENTITLEMENTS (handler) - GET all');

    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    function receiveResponse(error, result) {
      if(error) {
        return next(new restify.ResourceNotFound('Resource not found'));
      }

      res.send(result);
      return next();
    }

    model.get_all(receiveResponse);
  },
  getSpecificEntitlement: function(req, res, next) {
    var specificId = req.params.specificId;
    console.log('ENTITLEMENTS (handler) - GET individual (%s)', specificId);

    function receiveResponse(error, result) {
      if(error) {
        return next(new restify.ResourceNotFoundError('Resource not found'));
      }

      res.send(result);
      return next();            
    }

    model.get_individual(specificId, receiveResponse);    
  },
  postEntitlement: function(req, res, next) {
    console.log('ENTITLEMENTS (handler) - POST');

    function receiveResponse(error, result) {
      if (error) {
        console.log('Error: %s', error);
        return next(new restify.InvalidArgumentError(error));
      }
      res.send(201);
      return next();
    }

    model.add(req.params, receiveResponse);
  },
  deleteEntitlement: function(req, res, next) {
    var specificId = req.params.specificId;
    console.log('ENTITLEMENTS (handler) - DELETE');

    function receiveResponse(error, result) {
      if (error) {
        console.log('Error: %s', error);
        return next(new restify.InvalidArgumentError(error));
      }
      res.send(204);
      return next();
    }

    model.delete(specificId, receiveResponse);
  }
};
  
module.exports = handler;
