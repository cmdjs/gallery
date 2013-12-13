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
            return code.replace(' && define.amd', '');
          }
        },
        url: 'https://raw.github.com/blueimp/JavaScript-MD5/<%= pkg.version %>/js/md5.js',
        name: 'md5.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);

};

