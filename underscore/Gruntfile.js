module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src',
        header: 'define(function(require, exports, module) {',
        footer: '});'
      },
      debug: {
        url: 'https://raw.github.com/documentcloud/underscore/<%= pkg.version %>/underscore.js',
        name: 'underscore-debug.js'
      },
      min: {
        url: 'https://raw.github.com/documentcloud/underscore/<%= pkg.version %>/underscore-min.js',
        name: 'underscore.js'
      }
    },

    transport: {
      debug: {
        options: {
          debug: false,
          process: false
        },
        files: [{
          cwd: 'src',
          src: 'underscore-debug.js',
          dest: 'dist'
        }]
      },
      min: {
        options: {
          debug: false,
          process: false,
          uglify: {}
        },
        files: [{
          cwd: 'src',
          src: 'underscore.js',
          dest: 'dist'
        }]
      }
    }
  });

  require('grunt-spm-build').initConfig(grunt, {pkg: pkg});
  grunt.loadGlobalTasks('grunt-spm-build');
  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask(
    'build',
    [
      'download:debug', 'transport:debug',
      'download:min', 'transport:min', 'newline'
    ]
  );
};
