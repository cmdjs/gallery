define(function(require) {
  var morris = require('./dist/morris-debug');
  describe('morris', function() {
    it('should has EventEmitter method', function() {
      expect(morris.EventEmitter).to.be.a('function');
    });
  });
});
