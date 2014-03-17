define(function(require) {
  var module = require('./dist/d3');
  describe('d3', function() {
    it('should has d3.select function', function() {
      expect(module.select).to.be.a('function');
    });
  });
});

