define(function(require) {
  var module = require('./dist/marked');
  describe('marked', function() {
    it('should has parse method', function() {
      expect(module.parse).to.be.a('function');
    });
  });
});
