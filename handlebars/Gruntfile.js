module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src',
        header: 'define(function(require, exports, module) {',
        footer: 'module.exports = Handlebars;\n});'
      },
      src: {
        url: 'https://raw.github.com/wycats/handlebars.js/<%= pkg.version2 %>/dist/handlebars.js',
        name: 'handlebars.js'
      },
      runtime: {
        url: 'https://raw.github.com/wycats/handlebars.js/<%= pkg.version2 %>/dist/handlebars.runtime.js',
        name: 'runtime.js'
      }
    }
  });


  var config = require('spm-build').config;
  grunt.loadGlobalTasks('spm-build');
  grunt.loadTasks('../_tasks/download/tasks');
  grunt.util._.merge(grunt.config.data, config);
  grunt.registerTask('build', ['download', 'spm-build']);
};
