define(function(require) {
  require('./dist/jquery-color');
  var module = require('$');
  describe('jquery color', function() {
    it('should has Color method', function() {
      expect(module.Color).to.be.a('function');
    });
  });
});
