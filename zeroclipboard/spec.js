define(function(require) {
  var module = require('./dist/zeroclipboard');
  describe('ZeroClipboard', function() {
    it('should has ZeroClipboard.detectFlashSupport method', function() {
      expect(module.detectFlashSupport).to.be.a('function');
    });
  });
});
