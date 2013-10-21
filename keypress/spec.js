define(function(require) {
  var module = require('./dist/keypress');
  describe('keypress', function() {
    it('should has keypress.combo function', function() {
      expect(module.combo).to.be.a('function');
    });
    it('should not have window.keypress', function() {
      expect(window.keypress).not.to.be.ok();
    });
  });
});


