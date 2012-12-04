define(function(require) {
  var module = require('./dist/handlebars');
  describe('handlebars', function() {
    it('should has VERSION', function() {
      expect(module.VERSION).to.be.a('string');
    });
  });
});
