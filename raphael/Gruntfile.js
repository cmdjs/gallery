module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'dist'
      },
      debug: {
        options: {
          transform: function(code) {
            return [
                'define("gallery/raphael/'+pkg.version+'/raphael-debug", [], function() {',
                'var define;',
                code,
                "return window.Raphael;",
                "});"
            ].join('\n');
          }
        },
        url: 'https://raw.github.com/DmitryBaranovskiy/raphael/v<%= pkg.version %>/raphael.js',
        name: 'raphael-debug.js'
      },
      min: {
        options: {
          transform: function(code) {
            return [
                'define("gallery/raphael/'+pkg.version+'/raphael", [], function() {',
                'var define;',
                code,
                "return window.Raphael;",
                "});"
            ].join('\n');
          }
        },
        url: 'https://raw.github.com/DmitryBaranovskiy/raphael/v<%= pkg.version %>/raphael-min.js',
        name: 'raphael.js'
      }
    }
  });

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download']);
};


/** 只需 grunt, 直接下载到 dist 目录, 不需要再 spm build **/
