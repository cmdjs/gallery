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
            code.replace("factory(root, exports, _)", "factory(root, exports, _, jQuery)"),
            "this._ = previousUnderscore;",
            "this.jQuery = previousJQuery;",
            "});"
          ].join('\n');
        }
      },
      src: {
        url: 'https://raw.github.com/jashkenas/backbone/<%= pkg.version %>/backbone.js',
        name: 'backbone.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.loadTasks('../_tasks/download/tasks');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.registerTask('build', ['download', 'spm-build']);
};
