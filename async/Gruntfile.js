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
        url: 'https://raw.github.com/caolan/async/v<%= pkg.version %>/lib/async.js',
        name: 'async.js'
      }
    }
  });


  require('../node_modules/grunt-spm-build/').init(grunt, {pkg: pkg});
  grunt.loadTasks('../node_modules/grunt-spm-build/tasks');
  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
