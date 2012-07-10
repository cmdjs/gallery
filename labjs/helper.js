
var github = require('../github.js');


exports.getLatestVersion = function(callback) {

  github.get('https://raw.github.com/getify/LABjs/master/LAB.js', function(code) {
    var version = code.match(/v(\d\.\d\.\d) \(c\) Kyle Simpson/)[1];
    callback(version);
  });

};
