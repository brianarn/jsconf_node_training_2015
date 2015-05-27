// Get some colors
var request = require('request');

module.exports = function (callback) {
  console.info('getColors: Fetching colors...');
  request('http://2eeba416.ngrok.io/getColorQueue', function (err, res, body) {
    console.info('getColors: Response: ' + body);
    callback(err, body);
  });
};
