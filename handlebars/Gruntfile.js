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


  require('grunt-spm-build').initConfig(grunt, {pkg: pkg});
  grunt.loadTasks('../_tasks/download/tasks');
  grunt.loadGlobalTasks('grunt-spm-build');
  grunt.registerTask('build', ['spm-build']);
};
