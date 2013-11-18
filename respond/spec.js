define(function(require) {
  var module = require('./dist/respond');
  describe('respond', function() {
    it('should have window.respond', function() {
      expect(window.respond).to.be.a('object');
      expect(window.respond.update).to.be.a('function');
    });
  });
});
