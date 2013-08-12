module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src',
        transform: function(code) {
          return [
            'define(function(require, exports) {',
            'var previousUnderscore = this._;',
            'var previousJQuery = this.jQuery;',
            "this._ = require('underscore');",
            "this.jQuery = require('$');",
            code,
            "this._ = previousUnderscore;",
            "this.jQuery = previousJQuery;",
            "});"
          ].join('\n');
        }
      },
      src: {
        url: 'https://raw.github.com/documentcloud/backbone/<%= pkg.version %>/backbone.js',
        name: 'backbone-debug.js'
      },
      min: {
        url: 'https://raw.github.com/documentcloud/backbone/<%= pkg.version %>/backbone-min.js',
        name: 'backbone.js'
      }
    },
    transport: {
      options: {
        debug: false,
        process: false
      },
      debug: {
        files: [{
          cwd: 'src',
          src: 'backbone-debug.js',
          dest: 'dist'
        }]
      },
      min: {
        options: {
          uglify: {}
        },
        files: [{
          cwd: 'src',
          src: 'backbone.js',
          dest: 'dist'
        }]
      }
    }
  });

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.registerTask('build', ['download', 'spm-build']);
};
