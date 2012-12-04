define(function(require) {
  var module = require('./dist/jquery');
  describe('jquery', function() {
    it('should has ajax method', function() {
      expect(module.ajax).to.be.a('function');
    });
  });
});
