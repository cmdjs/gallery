module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'dist',
      },
      js: {
        options: {
          header: 'define("gallery/swfobject/<%= pkg.version %>/swfobject", [], function(require, exports, module) {',
          footer: 'module.exports = swfobject; })\n'
        },
        url: 'https://raw.github.com/swfobject/swfobject/master/swfobject/src/swfobject.js',
        name: 'swfobject.js'
      },
      swf: {
        url: "https://raw.github.com/swfobject/swfobject/master/swfobject/expressInstall.swf"
      }
    }
  });

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download']); 
};
