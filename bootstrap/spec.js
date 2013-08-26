define(function(require) {
  require('./dist/bootstrap');
  var module = require('$');
  describe('bootstrap', function() {
    it('js ok', function() {
      expect(module.fn.alert).to.be.a('function');
    });
  });
});
