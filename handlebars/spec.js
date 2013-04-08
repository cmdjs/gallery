define(function(require) {
  var module = require('./dist/handlebars');
  var runtime = require('./dist/runtime');
  describe('handlebars', function() {
    it('should has VERSION', function() {
      expect(module.VERSION).to.be.a('string');
      expect(runtime.VERSION).to.be.a('string');
    });
  });
});
