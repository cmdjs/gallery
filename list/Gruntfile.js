module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.registerMultiTask('modify', function() {
    var options = this.options({dest: 'src'});
    var data = this.data;

    grunt.log.writeln('modifing ' + data.src);
    var code = grunt.file.read(data.src);
    code = options.process(code);
    grunt.file.write(data.src, code);
    grunt.log.ok();
  });

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src',
      },
      src: {
        url: 'https://raw.github.com/javve/list/<%= pkg.version %>/src/list.js',
        name: 'list.js'
      },
      paging: {
        url: 'https://raw.github.com/javve/list/<%= pkg.version %>/plugins/paging/list.paging.js',
        name: 'paging.js'
      },
      fuzzySearch: {
        url: 'https://raw.github.com/javve/list/<%= pkg.version %>/plugins/fuzzy/list.fuzzySearch.js',
        name: 'fuzzySearch.js'
      }
    },
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: ['src/list.js', 'src/fuzzySearch.js', 'src/paging.js'],
        dest: 'src/list.js'
      }
    },
    modify: {
      options: {
        process: function(code) {
            code = 'define(function(require, exports, module) {\n' + code
            code = code.replace(
              'window.List = List;',
              'exports.List = List;'
            );
            code = code.replace(
              'window.ListJsHelpers = h;',
              'exports.ListJsHelpers = h;'
            );
            code = code.replace(
              '(function( window, undefined ) {',
              ''
            );
            code = code.replace(
              '})(window);',
              ''
            );
            code += '\n});\n'
            return code
        },
      },
      dist: {
        src: 'src/list.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.loadGlobalTasks('grunt-contrib-concat');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'concat:dist', 'modify', 'spm-build']);
};

