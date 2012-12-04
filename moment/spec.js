define(function(require) {
  var module = require('./dist/moment');
  describe('moment', function() {
    it('should has version', function() {
      expect(module.version).to.be.a('string');
    });
  });
});
