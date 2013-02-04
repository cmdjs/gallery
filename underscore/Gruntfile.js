module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    'spm-download': {
      options: {
        dest: 'src',
        header: 'define(function(require, exports, module) {',
        footer: '});'
      },
      src: {
        url: 'https://raw.github.com/documentcloud/underscore/<%= pkg.version %>/underscore.js',
        name: 'underscore-debug.js'
      },
      min: {
        url: 'https://raw.github.com/documentcloud/underscore/<%= pkg.version %>/underscore-min.js',
        name: 'underscore.js'
      }
    },

    'spm-transport': {
      options: {
        pkg: pkg,
        src: 'src',
        dest: 'dist'
      },
      min: {
        src: ['src/underscore.js'],
        options: {
          uglify: {}
        }
      },
      debug: ['src/underscore-debug.js']
    },

    'spm-clean': {
      all: ['src']
    }
  });

  grunt.loadTasks('../grunt-spm-build/tasks');
  grunt.registerTask('build', ['spm-download', 'spm-transport', 'spm-clean']);
};
