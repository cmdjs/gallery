module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src',
      },
      src: {
        options: {
          transform: function(code) {
            return [
                'define(function(require, exports, module) {',
                "var jQuery = require('$'), Raphael = require('raphael');",
                code.replace('window.Morris', 'module.exports'),
                "});"
            ].join('\n');
          }
        },
        url: 'https://raw.github.com/oesmith/morris.js/<%= pkg.version %>/morris.js',
        name: 'morris.js'
      },

      css: {
        url: 'https://raw.github.com/oesmith/morris.js/<%= pkg.version %>/morris.css',
        name: 'morris.css'
      }
    }
  });

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('default', ['download']);
};
