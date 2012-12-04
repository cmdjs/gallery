define(function(require) {
  var module = require('./dist/keymaster');
  describe('keymaster', function() {
    it('should has getScope method', function() {
      expect(module.getScope).to.be.a('function');
    });
  });
});
