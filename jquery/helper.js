
var github = require('../github.js');


exports.getLatestVersion = function(callback) {

  github.getLatestVersion('jquery/jquery', function(latestVersion) {
    callback(latestVersion);
  });

};
