module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src'
      },
      mergely: {
        options: {
          transform: function(code) {
            return [
              'define(function(require, exports, module) {',
              'var previousJQuery = this.jQuery;',
              'this.jQuery = require("$");',
              'var CodeMirror = require("codemirrorjs")',
              code,
              'module.exports = window.Mgly;',
              'this.jQuery = previousJQuery;',
              code,
              "});"
            ].join('\n');
          }
        },
        url: 'https://raw.githubusercontent.com/wickedest/Mergely/master/lib/mergely.js',
        name: 'mergely.js'
      },
      css: {
        url: 'https://raw.githubusercontent.com/wickedest/Mergely/master/lib/mergely.css',
        name: 'mergely.css'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};