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
              /\(function\s*\(undefined\)\s*\{/,
                'define(function(require, exports, module) {'
            );
            code = code.slice(0, code.indexOf('if (hasModule) {'))
            code += 'module.exports = moment;\n});\n'
            return code
          }
        },
        url: 'https://raw.github.com/timrwood/moment/<%= pkg.version %>/moment.js',
        name: 'moment.js'
      }
    }
  });

  require('grunt-spm-build').initConfig(grunt, {pkg: pkg});
  grunt.loadGlobalTasks('grunt-spm-build');

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
