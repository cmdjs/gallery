module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src',
        transform: function(code) {
          code = 'var keypress;\n' + code;
          code = 'define(function(require, exports, module) {\n' + code;
          code = code + 'module.exports = keypress;\n';
          code = code + '});'
          code = code.replace('window.keypress = {}', 'keypress = {}');
          return code;
        }
      },
      src: {
        url: 'https://raw.github.com/dmauro/Keypress/<%= pkg.version %>/keypress.js',
        name: 'keypress.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);

};

