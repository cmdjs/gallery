module.exports = function(grunt) {
  var fs = require('fs');
  var async = require('async');
  var request = require('request');

  var modules = fs.readdirSync('.').filter(function(name) {
    return fs.statSync(name).isDirectory() && !grunt.util._.contains(['.git', '_tasks', 'node_modules'], name);
  });

  grunt.registerTask('check', function() {
    var done = this.async();

    var q = async.queue(function(pkg, callback) {
      grunt.log.verbose.writeln('processing ' + pkg.name);
      checkupdate(pkg, function(err, version) {
        if (err) {
          grunt.log.warn(err);
        } else {
          if (version && version !== pkg.version) {
            grunt.log.writeln(print(pkg.name, pkg.version, version));
          } else {
            grunt.log.writeln(print(pkg.name, pkg.version));
          }
        }
      });
    }, modules.length);

    modules.forEach(function(m) {
      try {
        var pkg = require('./' + m + '/package.json');
        q.push(pkg, function(err) {
          if (err) {
            grunt.log.verbose.error(err);
          } else {
            grunt.log.verbose.writeln('add task ' + pkg.name);
          }
        });
      } catch (e) {
        grunt.log.verbose.error(e);
      }
    });

    q.drain = function() {
      done();
    };
  });

  function checkupdate(pkg, callback) {
    if (pkg.package) {
      grunt.log.verbose.writeln(pkg.package);
      request({json: true, url: pkg.package}, function(err, res, body) {
        if (err) {
          callback(err);
        } else if (res.statusCode !== 200) {
          callback('status code: ' + res.statusCode);
        } else {
          callback(null, body.version);
        }
      });
    } else if (pkg.repository) {
      var repo = pkg.repository.url;
      repo = repo.replace('https://github.com/', '');
      repo = repo.replace('git://github.com/', '');
      repo = repo.replace('.git', '');
      getVersion(repo, callback);
    } else {
      callback('check ' + pkg.homepage);
    }
  }

  function getVersion(repo, callback) {
    var uri = 'https://api.github.com/repos/' + repo + '/tags'
    request({json: true, url: uri}, function(err, res, body) {
      if (err) {
        callback(err);
      } else if (res.statusCode !== 200) {
        callback('status code: ' + res.statusCode);
      } else {

        var names = body.map(function(tag) {
          return tag.name.replace(/^[^\d\.]*((?:\d\.)+\d).*$/, '$1');
        });
        callback(null, names.sort().pop());
      }
    });
  }

  function print(name, version, latest) {
    var s = name + new Array(25 - name.length).join(' ');
    s += version + new Array(15 - version.length).join(' ');
    s += latest || '';
    return s;
  }
};
