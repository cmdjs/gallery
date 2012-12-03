define(function(require) {
  var module = require('./dist/less');
  describe('less', function() {
    it('should has Parser method', function() {
      expect(module.Parser).to.be.a('function');
    });
  });
});
