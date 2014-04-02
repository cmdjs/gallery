module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'dist',
      },
      src: {
        url: 'https://raw.github.com/visionmedia/mocha/<%= pkg.version %>/mocha.js',
        name: 'mocha-debug.js'
      },
      css: {
        url: "https://raw.github.com/visionmedia/mocha/<%= pkg.version %>/mocha.css",
        name: 'mocha-debug.css'
      }
    },
    uglify: {
      src: {
        files: {
          'dist/mocha.js': ['dist/mocha-debug.js']
        }
      }
    },
    cssmin: {
      src: {
        files: {
          'dist/mocha.css': ['dist/mocha-debug.css']
        }
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'cssmin:src', 'uglify:src', 'spm-newline']);
};
