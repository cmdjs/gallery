module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    uglify: {
      ie: {
        files: {
          'dist/sinon-ie.js': 'pkg/sinon-ie.js'
        }
      }
    }
  });

  grunt.registerTask('define', function() {
    var code = grunt.file.read('pkg/sinon.js');
    code = [
      code,
      'define(function(require, exports, module) {',
      '  module.exports = sinon;',
      '});',
    ].join('\n');
    grunt.file.write('src/sinon.js', code);
  });

  require('grunt-spm-build').initConfig(grunt, {pkg: pkg}, true);
  grunt.loadGlobalTasks('grunt-spm-build');
  grunt.registerTask('build', ['define', 'spm-build', 'uglify:ie']);
};
