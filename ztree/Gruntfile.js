module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,

        download: {
            options: {
                dest: 'src'
            },
            all: {
                options: {
                    transform: function(code) {
                        return [
                            'define(function(require, exports, module) {',
                            "var jQuery = require('$');",
                            code,
                            "});"
                        ].join('\n');
                    }
                },
                url: 'https://raw.github.com/zTree/zTree_v3/v<%= pkg.version%>/js/jquery.ztree.all-3.5.js',
                name: 'all.js'
            },
            core: {
                options: {
                    transform: function(code) {
                        return [
                            'define(function(require, exports, module) {',
                            "var jQuery = require('$');",
                            code,
                            "});"
                        ].join('\n');
                    }
                },
                url: 'https://raw.github.com/zTree/zTree_v3/v<%= pkg.version%>/js/jquery.ztree.core-3.5.js',
                name: 'core.js'
            },
            excheck: {
                options: {
                    transform: function(code) {
                        return [
                            'define(function(require, exports, module) {',
                            "var jQuery = require('$');",
                            code,
                            "});"
                        ].join('\n');
                    }
                },
                url: 'https://raw.github.com/zTree/zTree_v3/v<%= pkg.version%>/js/jquery.ztree.excheck-3.5.js',
                name: 'excheck.js'
            },
            exedit: {
                options: {
                    transform: function(code) {
                        return [
                            'define(function(require, exports, module) {',
                            "var jQuery = require('$');",
                            code,
                            "});"
                        ].join('\n');
                    }
                },
                url: 'https://raw.github.com/zTree/zTree_v3/v<%= pkg.version%>/js/jquery.ztree.exedit-3.5.js',
                name: 'exedit.js'
            },
            exhide: {
                options: {
                    transform: function(code) {
                        return [
                            'define(function(require, exports, module) {',
                            "var jQuery = require('$');",
                            code,
                            "});"
                        ].join('\n');
                    }
                },
                url: 'https://raw.github.com/zTree/zTree_v3/v<%= pkg.version%>/js/jquery.ztree.exhide-3.5.js',
                name: 'exhide.js'
            },
            css: {
                options: {
                    transform: function(code) {
                        code = code.replace('./img/line_conn.gif', 'https://i.alipayobjects.com/e/201303/2MFyKU1LW9.gif');
                        code = code.replace('./img/zTreeStandard.png', 'https://i.alipayobjects.com/e/201303/2MFzqnrx4P.png');
                        code = code.replace('./img/zTreeStandard.gif', 'https://i.alipayobjects.com/e/201303/2MFzMNFUUn.gif');
                        code = code.replace('./img/loading.gif', 'https://i.alipayobjects.com/e/201303/2MFyKU1LW9.gif');

                        return code;
                    }
                },
                url: 'https://raw.github.com/zTree/zTree_v3/v<%= pkg.version%>/css/zTreeStyle/zTreeStyle.css',
                name: "zTreeStyle.css"
            }
        }
    });

    grunt.loadTasks('../_tasks/download/tasks');
    grunt.registerTask('default', ['download']);
};
