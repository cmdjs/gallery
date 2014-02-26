define(function(require) {
  var module = require('./dist/numeral');
  describe('numeral', function() {
    it('should has version', function() {
      expect(module.version).to.be.a('string');
    });
  });
});
