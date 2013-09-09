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
                url: 'https://raw.github.com/scottjehl/Respond/<%= pkg.version%>/respond.src.js',
                name: 'respond.js'
            }
        }
    });

    grunt.loadTasks('../_tasks/download/tasks');
    grunt.registerTask('default', ['download']);
};
