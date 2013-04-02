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
        url: 'https://raw.github.com/LearnBoost/expect.js/<%= pkg.version %>/expect.js',
        name: 'expect.js'
      }
    }
  });

  require('grunt-spm-build').initConfig(grunt, {pkg: pkg});
  grunt.loadGlobalTasks('grunt-spm-build');

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
