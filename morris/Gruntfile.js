module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  function repl(code, filename) {
    code = code.trim();
    var id = pkg.family + '/' + pkg.name + '/' + pkg.version + '/' + filename;

    var header = [
      'define("' + id + '", ["$", "gallery/raphael/2.1.0/raphael"], function(require, exports, module) {',
      'var jQuery = require("$"), Raphael = require("gallery/raphael/2.1.0/raphael");'
    ].join('\n');
    var footer = '});';
    code = code.replace('window.Morris', 'module.exports');
    return [header, code, footer].join('\n');
  }

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'dist',
      },
      src: {
        options: {
          transform: function(code) {
            return repl(code, 'morris-debug');
          }
        },
        url: 'https://raw.github.com/oesmith/morris.js/<%= pkg.version %>/morris.js',
        name: 'morris-debug.js'
      },

      css: {
        url: 'https://raw.github.com/oesmith/morris.js/<%= pkg.version %>/morris.css',
        name: 'morris.css'
      },

      min: {
        options: {
          transform: function(code) {
            return repl(code, 'morris');
          }
        },
        url: 'https://raw.github.com/oesmith/morris.js/<%= pkg.version %>/morris.min.js',
        name: 'morris.js'
      }
    }
  });

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download']);
};
