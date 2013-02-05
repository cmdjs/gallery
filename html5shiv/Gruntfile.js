module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'dist'
      },
      src: {
        url: 'https://raw.github.com/aFarkas/html5shiv/<%= pkg.version %>/src/html5shiv.js',
        name: 'html5shiv-debug.js'
      },
      min: {
        url: 'https://raw.github.com/aFarkas/html5shiv/<%= pkg.version %>/dist/html5shiv.js',
        name: 'html5shiv.js'
      }
    }
  });

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download']);
};
