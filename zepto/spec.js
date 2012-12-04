define(function(require) {
  var module = require('./dist/zepto');
  describe('zepto', function() {
    it('should has ajax method', function() {
      expect(module.ajax).to.be.a('function');
    });
  });
});
