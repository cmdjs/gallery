define(function(require) {
  var module = require('./dist/keypress');
  console.log(module);
  describe('keypress', function() {
    it('should has keypress.Listener', function() {
      expect(module.Listener).to.be.a('function');
    });
    it('should not have window.keypress', function() {
      expect(window.keypress).not.to.be.ok();
    });
  });
});


