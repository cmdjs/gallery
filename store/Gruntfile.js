module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src'
      },
      src: {
        options: {
          transform: function(code) {
            return [
                'define(function(require, exports, module) {',
                'require("json");',
                code,
                "});"
            ].join('\n');
          }
        },
        url: 'https://raw.github.com/marcuswestin/store.js/v<%= pkg.version %>/store.js',
        name: 'store.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
