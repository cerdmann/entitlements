var restify = require('restify');
var model = require('./models/products.js');

var handler = {
  getAll: function(req, res, next) {
    console.log('PRODUCTS (handler) - GET all');

    function receiveResponse(error, result) {
      if(error) {
        return next(new restify.ResourceNotFound('Resource not found'));
      }

      res.send(result);
      return next();
    }

    model.get_all(receiveResponse);
  },
  getSpecific: function(req, res, next) {
    var specificId = req.params.specificId;
    console.log('PRODUCTS (handler) - GET individual (%s)', specificId);

    function receiveResponse(error, result) {
      if(error) {
        return next(new restify.ResourceNotFoundError('Resource not found'));
      }

      res.send(result);
      return next();
    }

    model.get_individual(specificId, receiveResponse);
  },
  post: function(req, res, next) {
    console.log('PRODUCTS (handler) - POST');

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
  delete: function(req, res, next) {
    var specificId = req.params.specificId;
    console.log('PRODUCTS (handler) - DELETE');

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
