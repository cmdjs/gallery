define(function(require) {
  var module = require('./dist/lab');
  describe('lab.js', function() {
    it('should has sandbox method', function() {
      expect(module.sandbox).to.be.a('function');
    });
  });
});
