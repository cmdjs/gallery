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
            code = 'define(function(require) {\n' +
              'var _zepto = window.Zepto;\n' +
              'var _$ = window.$;\n' + code;
            code += 'window.Zepto = _zepto;';
            code += 'window.$ = _$;';
            code += 'return Zepto;';
            code += '});';
            return code
          }
        },
        url: 'http://zeptojs.com/zepto.js',
        name: 'zepto.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
