module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src',
      },
      src: {
        options: {
          header: '',
          footer: [
            'define(function() {',
            'return window.JSON; });'
          ].join('\n')
        },
        url: 'https://raw.github.com/douglascrockford/JSON-js/master/json2.js',
        name: 'json.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
