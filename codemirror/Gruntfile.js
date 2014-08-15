module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src'
      },
      codemirror: {
        options: {
          transform: function(code) {
            return [
              'define(function(require, exports, module) {',
              code,
              "module.exports = window.CodeMirror;",
              "});"
            ].join('\n');
          }
        },
        url: 'https://raw.githubusercontent.com/marijnh/CodeMirror/v3.1/lib/codemirror.js',
        name: 'codemirror.js'
      },
      css: {
        url: 'https://raw.githubusercontent.com/marijnh/CodeMirror/v3.1/lib/codemirror.css',
        name: 'codemirror.css'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};