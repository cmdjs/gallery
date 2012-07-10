
var github = require('../github.js');


exports.getLatestVersion = function(callback) {

  github.getLatestVersion('jashkenas/coffee-script', function(latestVersion) {
    callback(latestVersion);
  });

};
