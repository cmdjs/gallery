var url = require('url')
var modules = [
  'async', 'backbone', 'coffee', 'es5-safe', 'expect', 'handlebars',
  'iscroll', 'jquery', 'jquery-color', 'json', 'jsuri', 'keymaster',
  'labjs', 'less', 'marked', 'mocha', 'moment', 'mustache',
  'socketio', 'store', 'swfobject', 'underscore', 'zepto', 'ztree'
]

modules.forEach(function(m) {
  var module = require('./' + m + '/package.json')
  if (module.package) {
    getJSON(module.package, function(data) {
      var package = JSON.parse(data)
      console.log('')
      if (package.version !== module.version) {
        console.info(module.name + ' ' + module.version + ' (latest ' + package.version + ')')
      } else {
        console.info(module.name + ' ' + module.version)
      }
    })
  } else {
    console.warn('\n' + module.name + ' ' + module.version + ' (check manually)')
  }
})


function getJSON(uri, callback) {
  var options = url.parse(uri)
  var connect = require(options.protocol.slice(0, -1))

  connect.get(options, function(res) {
    if (res.statusCode !== 200) {
      throw 'Error: No data received from ' + uri
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
      callback(data)
    })

  })
}
