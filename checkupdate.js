var url = require('url')
var modules = [
  'async', 'backbone', 'coffee', 'es5-safe', 'expect', 'handlebars',
  'html5shiv', 'iscroll', 'jquery', 'jquery-color', 'json', 'jsuri',
  'keymaster', 'labjs', 'less', 'marked', 'mocha', 'moment', 'mustache',
  'selection', 'socketio', 'store', 'swfobject', 'underscore', 'zepto',
  'ztree', 'juicer'
]

modules.forEach(function(m) {
  var module = require('./' + m + '/package.json')
  if (module.package) {
    getJSON(module.package, function(data) {
      if (data.version && data.version !== module.version) {
        console.info(module.name + ' ' + module.version + ' (latest ' + data.version + ')')
      } else if (data.version) {
        console.info(module.name + ' ' + module.version)
      } else {
        console.info(module.name + ' ' + module.version + ' (check ' +
                     module.repository.url + ')')
      }
    })
  } else if (module.repository) {
    var repo = module.repository.url
    var repo = repo.replace('https://github.com/', '')
    var repo = repo.replace('.git', '')
    getVersion(repo, function(version) {
      if (module.version != version) {
        console.info(module.name + ' ' + module.version + ' (latest ' + version + ')')
      } else {
        console.info(module.name + ' ' + module.version)
      }
    })
  } else {
      console.info(module.name + ' ' + module.version + ' (check ' +
                   module.homepage + ')')
  }
})


function getJSON(uri, callback) {
  var options = url.parse(uri)
  var connect = require(options.protocol.slice(0, -1))

  connect.get(options, function(res) {
    if (res.statusCode !== 200) {
      console.error('Error: No data received from ' + uri)
      return;
    }

    var ret = [], length = 0

    res.on('data', function(chunk) {
      length += chunk.length
      ret.push(chunk)
    })

    callback && res.on('end', function() {
      var buf = new Buffer(length), index = 0

      ret.forEach(function(chunk) {
        chunk.copy(buf, index, 0, chunk.length)
        index += chunk.length
      })

      var data = buf.toString()
      data = JSON.parse(data)
      callback(data)
    })

  })
}

function getVersion(repo, callback) {
  var uri = 'https://api.github.com/repos/' + repo + '/tags'
  getJSON(uri, function(tags) {
    var names = tags.map(function(tag) {
      return tag.name.replace(/^[^\d\.]*((?:\d\.)+\d).*$/, '$1');
    });
    callback(names.sort().pop());
  })
}
