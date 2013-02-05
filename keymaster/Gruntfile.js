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
    },
    'spm-clean': {
      build: ['tmp-transport', 'tmp-concat'],
      src: ['src']
    }
  });

  require('../_tasks/grunt-spm-build').init(grunt, {pkg: pkg});

  grunt.loadTasks('../_tasks/grunt-spm-build/tasks');
  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask(
    'build', ['download', 'spm-build', 'spm-clean:src']
  );
};
