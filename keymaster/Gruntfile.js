module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src',
        transform: function(code) {
          code = code.replace(
            ';(function(global){',
            'define(function(require, exports, module) {\nvar global = {};'
          );
          code = code.replace('})(this);', '});');
          code = code.replace(
            'module.exports = key', 'module.exports = global.key'
          );
          return code;
        }
      },
      src: {
        url: 'https://raw.github.com/lepture/keymaster/master/keymaster.js',
        name: 'keymaster.js'
      }
    }
  });

  require('grunt-spm-build').initConfig(grunt, {pkg: pkg});

  grunt.loadGlobalTasks('grunt-spm-build');
  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
