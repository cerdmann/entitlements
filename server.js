var restify = require('restify');
var fs = require('fs');
var entitlementsHandler = require('./handlers/entitlements.js');

var httpPort = process.env.PORT || 8080;


var rest_server = restify.createServer({
    name: 'EntitlementsApi'
});

rest_server
  .use(restify.acceptParser(rest_server.acceptable))
  .use(restify.fullResponse())
  .use(restify.bodyParser());

//next line help out with CURL see http://mcavage.me/node-restify/#Server-API
rest_server.pre(restify.pre.userAgentConnection());

//might need to add some oauth handling here. rest_server.use or rest_server.pre ?
//rest_server.use(function(req,res,next) {});

var entitlements_path = '/entitlements';

//rest_server.get(entitlements_path, entitlementsHandler.getEntitlements);
rest_server.post(entitlements_path, entitlementsHandler.postEntitlement);

rest_server.listen(httpPort, function() {
  var consoleMessage = '\n A RESTful API for the Quest Products App'
  consoleMessage += '\n ++++++++++++++++++++++++++++++++++++++++';
  consoleMessage += '\n \n %s listening at %s';
  consoleMessage += '\n \n Now open your browser to http://localhost:%s';
  consoleMessage += '\n ++++++++++++++++++++++++++++++++++++++++';

  console.log(consoleMessage, rest_server.name, rest_server.url, httpPort);
});
