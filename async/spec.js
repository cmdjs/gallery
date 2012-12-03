define(function(require) {
  var async = require('./dist/async');
  describe('async', function() {
    it('should has reduce method', function() {
      expect(async.reduce).to.be.a('function');
    });
  });
});
