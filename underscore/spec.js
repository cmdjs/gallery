define(function(require) {
  var module = require('./dist/underscore');
  describe('underscore', function() {
    it('should has VERSION', function() {
      expect(module.VERSION).to.be.a('string');
    });
  });
});
