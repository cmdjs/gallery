define(function(require) {
  var module = require('./dist/store');
  describe('store', function() {
    it('should not be disabled', function() {
      expect(module.disabled).to.not.be.ok();
    });
  });
});
