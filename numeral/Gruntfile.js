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
            code = code.replace(
              /\(function\s*\(\)\s*\{/,
              'define(function(require, exports, module) {'
            );
            code = code.slice(0, code.indexOf('if (hasModule) {'));
            code += 'module.exports = numeral;\n});\n';
            return code;
          }
        },
        url: 'https://raw.github.com/adamwdraper/Numeral-js/<%= pkg.version %>/numeral.js',
        name: 'numeral.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
