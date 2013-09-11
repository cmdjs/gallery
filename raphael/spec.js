define(function(require) {
  var raphael = require('./dist/raphael-debug');
  describe('raphael', function() {
    it('is Function', function() {
      expect(raphael).to.be.a('function');
    });
  });
});
