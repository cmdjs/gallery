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
            code = 'define(function(require, exports, module) {\n' + code;
            code += '});';
            code = code.replace("require('jquery')", "require(\"$\")");
            return code;
          }
        },
        url: 'https://raw.githubusercontent.com/vakata/jstree/<%= pkg.version %>/dist/jstree.js',
        name: 'jstree.js'
      },
      css: {
        url: 'https://raw.githubusercontent.com/vakata/jstree/3.0.2/dist/themes/default/style.css',
        name: 'default.css'
      },
      png: {
        url: 'https://raw.githubusercontent.com/vakata/jstree/3.0.2/dist/themes/default/32px.png',
        name: '32px.png'
      },
      png2: {
        url: 'https://raw.githubusercontent.com/vakata/jstree/3.0.2/dist/themes/default/40px.png',
        name: '40px.png'
      },
      gif: {
        url: 'https://raw.githubusercontent.com/vakata/jstree/3.0.2/dist/themes/default/throbber.gif',
        name: 'throbber.gif'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};

