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
              code.replace("_cjsModuleId = module.id || null;", "").replace(' && typeof window.require === "function"', ''),
              "window.ZeroClipboard = module.exports; })"
            ].join('\n');
          }
        },
        url: 'https://raw.github.com/zeroclipboard/ZeroClipboard/v<%= pkg.version%>/ZeroClipboard.js',
        name: 'zeroclipboard.js'
      }/*,
      swf: {
        url: "https://raw.github.com/zeroclipboard/ZeroClipboard/v<%= pkg.version%>/ZeroClipboard.swf",
        name: "ZeroClipboard.swf"
      }*/
    }
  });

  var config = require('spm-build').config;
  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
