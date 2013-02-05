module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'dist'
      },
      src: {
        url: 'https://raw.github.com/lifesinger/dew/master/dist/es5-safe/<%= pkg.version %>/es5-safe-debug.js',
        name: 'es5-safe-debug.js'
      },
      min: {
        url: 'https://raw.github.com/lifesinger/dew/master/dist/es5-safe/<%= pkg.version %>/es5-safe.js',
        name: 'es5-safe.js'
      }
    }
  });

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download']);
};
