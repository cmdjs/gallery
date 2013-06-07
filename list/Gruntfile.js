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
            code = 'define(function(require, exports, module) {' + code
            code = code.replace(
              'window.List = List;',
              'exports.List = List;'
            );
            code = code.replace(
              'window.ListJsHelpers = h;',
              'exports.ListJsHelpers = h;'
            );
            code += '\n});\n'
            return code
          }
        },
        url: 'https://raw.github.com/javve/list/<%= pkg.version %>/src/list.js',
        name: 'list.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};

