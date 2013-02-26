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
      src: {
        url: 'https://raw.github.com/caolan/async/v<%= pkg.version %>/lib/async.js',
        name: 'async-debug.js'
      },
      min: {
        url: 'https://raw.github.com/caolan/async/v<%= pkg.version %>/dist/async.min.js',
        name: 'async.js'
      }
    },

    'spm-transport': {
      options: {
        pkg: pkg,
        src: 'src',
        dest: 'dist'
      },
      min: {
        src: ['src/async.js'],
        options: {
          uglify: {}
        }
      },
      debug: ['src/async-debug.js']
    },

    'spm-clean': {
      all: ['src']
    }
  });

  grunt.loadTasks('../node_modules/grunt-spm-build/tasks');
  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-transport', 'spm-clean']);
};
