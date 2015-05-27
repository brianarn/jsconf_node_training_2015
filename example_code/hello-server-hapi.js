var Hapi = require('hapi');

var server = new Hapi.Server();
server.connection({ port : 1337 });

server.route({
  method: 'GET',
  path: '/',
  handler: function (req, reply) {
    reply('Hello world!');
  }
});

server.start(function () {
  console.log('Server running at 1337');
});
