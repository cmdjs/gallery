define(function(require) {
  var module = require('./dist/modernizr');
  describe('modernizr', function() {
    it('should has version', function() {
      expect(module.version).to.be.a('string');
    });
  });
});
