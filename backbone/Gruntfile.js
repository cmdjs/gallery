module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    'spm-download': {
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
            "});",
          ].join('\n');
        }
      },
      src: {

        url: 'https://raw.github.com/documentcloud/backbone/<%= pkg.version %>/backbone.js',
        name: 'backbone.js'
      },
      min: {
        url: 'https://raw.github.com/documentcloud/backbone/<%= pkg.version %>/backbone-min.js',
        name: 'backbone.js'
      }
    },

    'spm-transport': {
      options: {
        pkg: pkg,
        src: 'src',
        dest: 'dist'
      },
      src: ['src/backbone.js'],
      min: {
        src: ['src/backbone.js'],
        options: {
          uglify: {}
        }
      }
    },

    'spm-beautify': {
      options: {
        src: 'dist',
        dest: 'dist'
      },
      src: ['dist/backbone.js']
    },

    'spm-clean': {
      all: ['src']
    }
  });

  grunt.loadTasks('../grunt-spm-build/tasks');
  grunt.registerTask(
    'build', [
      'spm-download',
      'spm-transport:src', 'spm-beautify:src', 'spm-transport:min',
      'spm-clean'
    ]
  );
};
