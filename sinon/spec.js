define(function(require) {
  var module = require('./dist/sinon');

  describe('sinon', function() {
    it('should have spy and stub', function() {
      expect(module.spy).to.be.a('function');
      expect(module.stub).to.be.a('function');
    });
  });
});
