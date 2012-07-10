
var url = require('url');
const API_URL = 'https://api.github.com/repos/';


exports.getLatestVersion = function(repos, callback) {

  getTags(repos, function(tags) {
    var names = tags.map(function(tag) {
      return tag.name.replace(/^[^\d\.]*((?:\d\.)+\d).*$/, '$1');
    });
    callback(names.sort().pop());
  });

};


exports.get = function (uri, callback) {
  console.log('  ... Fetching ' + uri);

  var options = url.parse(uri);
  var connect = require(options.protocol.slice(0, -1));

  var req = connect.get(options, function(res) {
    if (res.statusCode === 200) {
      var data = '';

      res.on('data', function(chuck) {
        data += chuck;
      });
      res.on('end', function() {
        callback(data);
      });
    }
    else {
      throw 'Error: No data received from ' + uri;
    }
  });

  req.on('error', function(e) {
    throw 'Got error: ' + e.message;
  });
};


function getTags(repos, callback) {
  exports.get(API_URL + repos + '/tags', function(data) {
    callback(JSON.parse(data));
  });
}

exports.getTags = getTags
