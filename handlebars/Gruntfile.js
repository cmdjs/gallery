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
      }
    }
  });


  require('../node_modules/grunt-spm-build/').init(grunt, {pkg: pkg});
  grunt.loadTasks('../node_modules/grunt-spm-build/tasks');
  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
