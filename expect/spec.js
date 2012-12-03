define(function(require) {
  var module = require('./dist/expect');
  describe('expect', function() {
    it('should has version', function() {
      expect(module.version).to.be.a('string');
    });
  });
});
