module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src',
        header: 'define(function(require, exports, module) {',
        footer: '});'
      },
      src: {
        url: 'https://raw.github.com/documentcloud/underscore/<%= pkg.version %>/underscore.js',
        name: 'underscore.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.loadTasks('../_tasks/download/tasks');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.registerTask('build', ['download', 'spm-build']);

};
