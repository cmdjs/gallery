define(function(require) {
  var module = require('./dist/placeholders');
  describe('placeholders', function() {
    it('should has Placeholders.enable', function() {
      expect(module.enable).to.be.a('function');
    });
    it('should not has window.Placeholders', function() {
      expect(window.Placeholders).not.to.be.ok();
    });
  });
});

