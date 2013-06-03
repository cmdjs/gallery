define(function(require) {
  var module = require('./dist/math-debug');
  describe('mathjs', function() {
    it('should has round method', function() {
      expect(module.round).to.be.a('function');
    });
  });
});
