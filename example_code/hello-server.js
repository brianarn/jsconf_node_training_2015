var http = require('http');

var server = http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text'
  });
  res.end('Hello, world!');
});

server.listen(1337);
