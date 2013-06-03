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
        url: 'https://raw.github.com/madrobby/keymaster/master/keymaster.js',
        name: 'keymaster.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);

};
