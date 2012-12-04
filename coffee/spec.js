define(function(require) {
  var module = require('./dist/coffee-script');
  describe('coffee', function() {
    it('should has VERSION', function() {
      expect(module.VERSION).to.be.a('string');
    });
  });
});
