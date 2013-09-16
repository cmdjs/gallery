module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src'
      },
      main: {
        options: {
          transform: function(code) {
            code = 'require("./utils");\n' + code
            code = 'define(function(require, exports, module) {\n' + code
            code += '\nmodule.exports = Placeholders;';
            code += '\ntry{delete window.Placeholders;}catch(e){window.Placeholders=null;}';
            code += '\n});'
            return code
          }
        },
        url: 'https://raw.github.com/jamesallardice/Placeholders.js/v<%= pkg.version %>/lib/main.js',
        name: 'placeholders.js'
      },
      utils: {
        options: {
          transform: function(code) {
            code = 'define(function(require, exports, module) {\n' + code
            code += '\n});'
            return code
          }
        },
        url: 'https://raw.github.com/jamesallardice/Placeholders.js/v<%= pkg.version %>/lib/utils.js',
        name: 'utils.js'
      }
    }

  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
