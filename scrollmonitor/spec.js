define(function(require) {
  var module = require('./dist/scrollmonitor');
  describe('scrollmonitor', function() {
    it('should have create function', function() {
      expect(module).to.be.a('object');
      expect(module.create).to.be.a('function');
    });
  });
});
