define(function(require) {
  var module = require('./dist/backbone');
  describe('backbone', function() {
    it('should has VERSION', function() {
      expect(module.VERSION).to.be.a('string');
    });
  });
});
