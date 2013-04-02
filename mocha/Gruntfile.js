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
      css: {
        files: {
          'dist/mocha.css': ['dist/mocha-debug.css']
        }
      }
    }
  });

  require('grunt-spm-build').initConfig(grunt, {pkg: pkg});
  grunt.loadGlobalTasks('grunt-spm-build');

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'uglify', 'cssmin', 'newline']);
};
