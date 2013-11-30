define(function(require) {
  var module = require('./dist/list');
  describe('list', function() {
    it('should be constructor', function() {
      expect(module).to.be.a('function');
      expect(new module()).to.be.a('object');
    });
  });
});
