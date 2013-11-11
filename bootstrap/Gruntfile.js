module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,

        download: {
            options: {
                dest: 'src'
            },
            js: {
                options: {
                    transform: function(code) {
                        return [
                            'define(function(require, exports, module) {',
                            "var jQuery = require('$');",
                            code.replace(/window\.jQuery/g, "jQuery"),
                            "});"
                        ].join('\n');
                    }
                },
                url: 'https://raw.github.com/twbs/bootstrap/v<%= pkg.version%>/dist/js/bootstrap.js',
                name: 'bootstrap.js'
            },
            css: {
                options: {
                    transform: function(code) {
                        return code.replace(/\.\.\/fonts\//g, './fonts/');
                    }
                },
                url: 'https://raw.github.com/twbs/bootstrap/v<%= pkg.version%>/dist/css/bootstrap.css',
                name: "bootstrap.css"
            },
            "css-theme": {
                url: 'https://raw.github.com/twbs/bootstrap/v<%= pkg.version%>/dist/css/bootstrap-theme.css',
                name: "bootstrap-theme.css"
            }/*,
            fonts1: {
                options: {
                   dest: 'src/fonts'
                },
                url: 'https://github.com/twbs/bootstrap/raw/master/fonts/glyphicons-halflings-regular.eot',
                name: 'glyphicons-halflings-regular.eot'
            },
            fonts2: {
                options: {
                   dest: 'src/fonts'
                },
                url: 'https://github.com/twbs/bootstrap/raw/master/fonts/glyphicons-halflings-regular.ttf',
                name: 'glyphicons-halflings-regular.ttf'
            },
            fonts3: {
                options: {
                   dest: 'src/fonts'
                },
                url: 'https://github.com/twbs/bootstrap/raw/master/fonts/glyphicons-halflings-regular.svg',
                name: 'glyphicons-halflings-regular.svg'
            },
            fonts4: {
                options: {
                   dest: 'src/fonts'
                },
                url: 'https://github.com/twbs/bootstrap/raw/master/fonts/glyphicons-halflings-regular.woff',
                name: 'glyphicons-halflings-regular.woff'
            }*/
        }
    });

    grunt.loadTasks('../_tasks/download/tasks');
    grunt.registerTask('default', ['download']);
};
