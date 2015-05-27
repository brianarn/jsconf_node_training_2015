// Get some colors
var request = require('request');

module.exports = {
  getColors: function (callback) {
    console.info('colorBot: Fetching colors...');
    request('http://2eeba416.ngrok.io/getColorQueue', function (err, res, body) {
      console.info('getColors: Response: ' + body);
      callback(err, body);
    });
  },
  addColor: function (red, green, blue, callback) {
    colors = [red, green, blue].join('/');
    console.info('colorBot: Adding color ' + colors);
    request.post('http://2eeba416.ngrok.io/addColor', {
      form: {
        red: red,
        green: green,
        blue: blue
      }
    }, function (err, res, body) {
      console.info('addColor: Response: ' + body);
      callback(err, body);
    })
  }
};
