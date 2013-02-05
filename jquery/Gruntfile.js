module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src',
        header: 'define(function(require) {',
        footer: [
          'return $.noConflict(true);',
          '});'
        ].join('\n')
      },
      src: {
        url: 'http://code.jquery.com/jquery-<%= pkg.version %>.js',
        name: 'jquery-debug.js'
      },
      min: {
        url: 'http://code.jquery.com/jquery-<%= pkg.version %>.min.js',
        name: 'jquery.js'
      }
    },

    'spm-transport': {
      options: {
        pkg: pkg,
        src: 'src',
        dest: 'dist'
      },
      min: {
        src: ['src/jquery.js'],
        options: {
          uglify: {}
        }
      },
      src: ['src/jquery-debug.js']
    },

    'spm-clean': {
      all: ['src']
    }
  });

  grunt.loadTasks('../_tasks/grunt-spm-build/tasks');
  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-transport', 'spm-clean']);
};
