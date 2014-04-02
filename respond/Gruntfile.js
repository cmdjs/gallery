module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,

        download: {
            options: {
                dest: 'src',
                header: 'define(function(require, exports, module) {',
                footer: '});'
            },
            src: {
                url: 'https://raw.github.com/scottjehl/Respond/<%= pkg.version%>/dest/respond.src.js',
                name: 'respond.js'
            }
        }
    });

    grunt.loadGlobalTasks('spm-build');
    grunt.util._.merge(grunt.config.data, require('spm-build').config);

    grunt.loadTasks('../_tasks/download/tasks');
    grunt.registerTask('build', ['download', 'spm-build']);
};
