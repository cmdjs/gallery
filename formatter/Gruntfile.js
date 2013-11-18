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
      debug: {
        url: 'https://raw.github.com/firstopinion/formatter.js/master/lib/formatter.js',
        name: 'formatter-debug.js'
      },
      min: {
        url: 'https://raw.github.com/firstopinion/formatter.js/master/lib/formatter.min.js',
        name: 'formatter.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);

};

