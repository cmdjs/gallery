module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src',
        transform: function(code) {
          return 'define(function(require, exports, module) {\n' + code + '\n});';
        }
      },
      src: {
        url: 'https://raw.github.com/josdejong/mathjs/v<%= pkg.version %>/math.js',
        name: 'math.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);

};
