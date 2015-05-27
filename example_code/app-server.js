// Dependencies
// Server: 'http://2eeba416.ngrok.io'
var Hapi = require('hapi');
var getColors = require('./getColors');

// Make our server
var server = new Hapi.Server();
server.connection({ port : 1337 });

// Color Queue
server.route({
  path: '/colorQueue',
  method: 'GET',
  handler: function (req, reply) {
    getColors(function (err, body) {
      reply(err || body);
    });
  }
})

// Final route for static content
server.route({
  path: '/{param*}',
  method: 'GET',
  handler: {
    directory: {
      path: 'public'
    }
  }
});

// Start it up!
server.start(function () {
  console.log('Server running at:', server.info.uri);
});
