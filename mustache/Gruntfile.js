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
          header: 'define(function(require, exports, module) {',
          footer: '});'
        },
        url: 'https://raw.github.com/janl/mustache.js/<%= pkg.version %>/mustache.js',
        name: 'mustache.js'
      }
    }
  });

  require('../node_modules/grunt-spm-build').init(grunt, {pkg: pkg});
  grunt.loadTasks('../node_modules/grunt-spm-build/tasks');

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
