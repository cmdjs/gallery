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
          transform: function(code) {
            code = 'define(function(require, exports, module) {\n' + code
            code += '\n});'
            return code
          }
        },
        url: 'https://raw.github.com/sakabako/scrollMonitor/<%= pkg.version %>/scrollMonitor.js',
        name: 'scrollmonitor.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
