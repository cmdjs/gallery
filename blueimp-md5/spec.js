define(function(require) {
  var module = require('./dist/md5');
  describe('md5.js', function() {
    it('md5 should be a function', function() {
      expect(module).to.be.a('function');
    });
  });
});

