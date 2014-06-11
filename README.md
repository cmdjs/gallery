## 引入 CMD 模块指南


### 准备工作

#### 安装 grunt-cli 和 spm2

```
npm install grunt-cli -g
npm install spm@2.x -g -f
```

#### Fork cmdjs/gallery 仓库

Fork [cmdjs/gallery](https://github.com/cmdjs/gallery) 到自己的仓库中, 然后把 fork 后的仓库克隆到本地, 如:

```
git clone git@github.com:{{your_username}}/gallery.git
```

然后安装依赖模块。

```
npm install
```

cmdjs 下的 jquery 仓库, 步骤是和 gallery 类似的.

### 迁移 CMD 模块

#### 选定某模块

例如 [Highcharts 在 github 上的仓库](https://github.com/highslide-software/highcharts.com)

```
cd jquery           // or cd 到 gallery
mkdir highcharts    // 以模块名建目录, 小写, 多单词用 '-' 连接
cd highcharts
touch package.json  // 模块元信息
touch Gruntfile.js  // 下载及处理脚本
touch spec.js       // 简单测试用例脚本
```

#### 编辑 package.json

package.json 各项含义参考 [这里](http://docs.spmjs.org/en/package), 一般可以复制以下的模板, 替换各值即可.

```js
{
    "family": "jquery",
    "name": "highcharts",
    "version": "3.0.4",
    "title": "Highcharts JS",
    "description": "Highcharts JS is a JavaScript charting library based on SVG and VML rendering.",
    "docs": "http://docs.highcharts.com/",
    "homepage": "http://www.highcharts.com/",
    "demo": "http://www.highcharts.com/demo/",
    "author": {
        "name" : "http://highsoft.com/",
        "url" : "http://highsoft.com/"
    },
    "keywords": [
        "Charts",
        "SVG"
    ],
    "licenses": "www.highcharts.com/license",
    "dependencies": {
        "jquery": "*"
    },
    "repository": {
        "type": "git",
        "url": "git://github.com/highslide-software/highcharts.com.git"
    },
    "spm": {
        "alias": {
            "$": "$"
        },
        "output": [
            "highcharts.js",
            "highcharts-more.js",
            "exporting.js",
            "highstock.js"
        ]
    }
}
```

**注意** 有些信息可以直接在模块的原仓库地址中的某些文件中找到, 如: bower.json, *.jquery.json, component.json, 甚至有完整的 package.json,
另外, 需要添加我们特有的 spm 字段. 如果没有依赖 jquery, 则 spm.alias 下的 ``$`` 可以去掉

#### 编写 Gruntfile.js

```js
module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    download: {
      options: {
        dest: 'src'
      },
      highcharts: {
        options: {
          transform: function(code) {
            // 根据需要对下载下来的 js 代码进行修改, 大致有以下几点
            // - 模块已有依赖的库, 如 jquery, 需要统一 require('$')
            // - 如果模块有返回的话, 需要在末尾通过 module.exports 方式返回
            // - 有些模块内部有判断 amd / cmd 的逻辑的话, 则无须包裹 define, 直接采用它的即可, 例如 jquery/jquery
            return [
              'define(function(require, exports, module) {',
              'var previousJQuery = this.jQuery;',
              "this.jQuery = require('$');",
              code,
              "module.exports = window.Highcharts;",
              "this.jQuery = previousJQuery;",
              "});"
            ].join('\n');
          }
        },
        // 设置文件所在地址, 版本号替换成变量, 这样之后只需修改 package.json 的版本信息
        url: 'https://raw.github.com/highslide-software/highcharts.com/v<%= pkg.version%>/js/highcharts.src.js',
        // 设置文件名字, 可参考原来源仓库中的名字来
        name: 'highcharts.js'
      },
      // ....
      exporting: {
        options: {
          transform: function(code) {
            return [
              'define(function(require, exports, module) {',
              code,
              "});"
            ].join('\n');
          }
        },
        url: 'https://raw.github.com/highslide-software/highcharts.com/v<%= pkg.version%>/js/modules/exporting.src.js',
        name: 'exporting.js'
      }
    }
  });

  grunt.loadGlobalTasks('spm-build');
  grunt.util._.merge(grunt.config.data, require('spm-build').config);

  grunt.loadTasks('../_tasks/download/tasks');
  grunt.registerTask('build', ['download', 'spm-build']);
};
```

写完之后, 就可以执行 `spm build`, 下载对应文件并按照需要修改代码.
下载的文件保存在 src/ 下, 可打开看下各个文件是否正确.

这个过程, 主要是做了从源仓库中下载 js/css 文件, 并对下载下来的代码进行处理, 比如 js 文件, 可以设置 transform 封装成 ``define(factory)`` 的形式.
transform 中的函数参数 ``code`` 即为下载下来模块的代码, 你可以根据需要替换/添加其中的特殊代码.

#### 编写简单的测试用例 spec.js

挑选模块中暴露的公共接口, 简单验证一下即可.

```js
define(function(require) {
    var $ = require("$");
    var Highcharts = require('./src/highcharts');

    require('./src/exporting');
    require('./src/highcharts-more');

    describe('Highcharts', function() {
        it('should has spec memeber', function() {
            expect(Highcharts.version).to.be.a('string');
            expect(Highcharts.seriesTypes.gauge).to.be.a('function');
            expect(Highcharts.post).to.be.a('function');
        });
    });
});
```
之后将该模块所在目录名, 添加到 jquery/index.html 中的 ``modules`` 数组中, 在浏览器中打开 index.html, 查看用例是否通过.

#### 编译 src/

一般测试用例通过后, 执行

```
cd highcharts
spm install
spm build
```

编译好的文件在 dist/ 目录. 只需看下各文件是否都已生成, 确保没有遗漏文件.
这步会根据对 src/ 下的文件, 进行 concat / transport 处理, 并生成源码和压缩后的代码. 具体请参考 [spm](http://docs.spmjs.org) 的文档

### 发布及取消发布

#### 发布至源

```
spm build            // 发布之前先编译一次
spm publish -s spmjs // 发布当前版本
spm publish -s spmjs -f     // 强制发布源上已有版本, 这里需要有发布权限, 没有权限会给出错误提示, 申请权限请找 @lepture

spm unpublish jquery/highcharts@3.0.4   // 从源上删除某个版本的模块
spm unpublish jquery/highcharts          // 从源上伤处某个模块的所有版本
```

#### 提交至 github

```
git commit -a -m "A: add highcharts"
git push // 之后到 cmdjs/gallery 上提 pull request
```

**注意:** src/ 和 dist/ 目录都不需要提交至仓库中. 只需要 package.json, Gruntfile.js 和 spec.js.

### 使用

```js
seajs.config({
    "alias": {
        "$": "jquery/jquery/1.10.1/jquery",
        "highcharts": "jquery/highcharts/3.0.4/highcharts",
        "highcharts-exporting": "jquery/highcharts/3.0.4/exporting",
        "highcharts-more": "jquery/highcharts/3.0.4/highcharts-more"
    }
});
seajs.use(["$", "highcharts"], function($, Highcharts) {
    // use Highcharts
    $("#demo").highcharts({
        //...
    });
});
```

### 检查各模块的版本更新

通过以下命令检查 jquery 或 gallery 下各模块有没更新版本

```
cd jquery or cd gallery
grunt check
```

结果有三列: 第一列为模块名字, 第二列为模块当前版本, 第三列为模块原仓库中的当前版本.
 根据需要升级本地模块 package.json 中的 version. 请选择稳定版本. 开发中的版本不考虑.
 升级版本之后, 需要重新 `spm build` 和 `spm publish`
