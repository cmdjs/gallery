/*
 * Copyright (c) 2013 Hsiaoming Yang
 * Licensed under the MIT license.
 */

/* example of config
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  download: {
    options: {
      dest: 'src',
      header: 'define(function(require) {',
      footer: [
        'return $.noConflict(true);',
        '});'
      ].join('\n')
    },
    src: {
      options: {
        transform: function(code) {
          return code;
        }
      },
      url: 'http://code.jquery.com/jquery-<%= pkg.version %>.js',
      name: 'jquery-debug.js'
    },
    min: {
      url: 'http://code.jquery.com/jquery-<%= pkg.version %>.min.js',
      name: 'jquery.js'
    }
  }
});
*/

var request = require('request');
var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('download', function() {
    var done = this.async();

    var options = this.options({dest: 'src'});
    var data = this.data;

    grunt.log.writeln('downloading ' + data.url);
    request.get(data.url, function(err, res, body) {
      if (err) {
        grunt.log.error(err);
      } else if (res.statusCode !== 200) {
        grunt.log.error('status code: ' + res.statusCode);
      } else {
        var code = body;
        if (options.transform && typeof options.transform === 'function') {
          grunt.log.writeln('Transform code');
          code = options.transform(code);
        } else if (options.header || options.footer ) {
          grunt.log.writeln('Add header and footer');
          code = [options.header || '', code, options.footer || ''].join('\n');
        }
        grunt.file.write(path.join(options.dest, data.name), code);
        grunt.log.ok();
      }
      done();
    });
  });

  grunt.registerTask('spm-build', [
    'clean:build', // delete build direcotry first

    'spm-install', // install dependencies

    // build css
    'transport:src',  // src/* -> .build/src/*
    'concat:css',   // .build/src/*.css -> .build/tmp/*.css

    // build js (must be invoke after css build)
    'transport:css',  // .build/tmp/*.css -> .build/src/*.css.js
    'concat:js',  // .build/src/* -> .build/dist/*.js

    // to ./build/dist
    'copy:build',
    'cssmin:css',   // .build/tmp/*.css -> .build/dist/*.css
    'uglify:js',  // .build/tmp/*.js -> .build/dist/*.js

    'clean:dist',
    'copy:dist',  // .build/dist -> dist
    'clean:build',

    'spm-newline'
  ]);
};
