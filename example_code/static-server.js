var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port : 1337 });

server.route({
  path: '/{param*}',
  method: 'GET',
  handler: {
    directory: {
      path: 'public'
    }
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
