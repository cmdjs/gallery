define(function(require) {
  var module = require('./dist/socketio');
  describe('socketio', function() {
    it('should has version', function() {
      expect(module.version).to.be.a('string');
    });
  });
});
