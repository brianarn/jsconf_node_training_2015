// Dependencies
// Server: 'http://2eeba416.ngrok.io'
var Hapi = require('hapi');
var Joi = require('joi');
var request = require('request');
var colorBot = require('./colorBot');

// Make our server
var server = new Hapi.Server();
server.connection({ port : 1337 });

// Color Queue
server.route({
  path: '/colorQueue',
  method: 'GET',
  handler: function (req, reply) {
    colorBot.getColors(function (err, body) {
      reply(err || body);
    });
  }
});

server.route({
  path: '/addColor/{red}/{green}/{blue}',
  method: 'GET',
  handler: function (req, reply) {
    // Get params
    var red = req.params.red;
    var green = req.params.green;
    var blue = req.params.blue;

    colorBot.addColor(red, green, blue, function (err, res, body) {
      if (err) {
        reply('Robot server issue: ' + err);
        return;
      }

      reply('Color added successfully');
    });
  },
  config: {
    validate: {
      params: {
        red: Joi.number().min(0).max(255),
        green: Joi.number().min(0).max(255),
        blue: Joi.number().min(0).max(255)
      }
    }
  }
});

server.route({
  path: '/addColor',
  method: 'POST',
  handler: function (req, reply) {
    var red = req.payload.red;
    var green = req.payload.green;
    var blue = req.payload.blue;

    colorBot.addColor(red, green, blue, function (err, body) {
      if (err) {
        reply('Robot server issue: ' + err);
        return;
      }

      reply('Color added successfully');
    })
  },
  config: {
    validate: {
      payload: {
        red: Joi.number().min(0).max(255),
        green: Joi.number().min(0).max(255),
        blue: Joi.number().min(0).max(255)
      }
    }
  }
});

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
