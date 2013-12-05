define(function(require) {
  var module = require('./dist/spin');
  describe('spin.js', function() {
    it('shoud have spin function', function() {
      expect(new module().spin).to.be.a('function');
    });
  });
});

