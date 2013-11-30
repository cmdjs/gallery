module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src',
        transform: function(code) {
          code = code.replace(/require/g, 'listjs_require');
          code = code.replace(/^;\(function\(\)\{/, 'define(function(require, exports, module) {');
          code = code.replace(/\(\);$/, ';');
          return code;
        }
      },
      src: {
        url: 'https://raw.github.com/javve/list.js/v<%= pkg.version%>/dist/list.js',
        name: 'list.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);

};
