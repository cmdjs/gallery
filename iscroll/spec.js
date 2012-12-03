define(function(require) {
  var iscroll = require('./dist/iscroll');
  var lite = require('./dist/iscroll-lite');
  describe('iscroll', function() {
    it('iscroll should has prototype enabled', function() {
      expect(iscroll.prototype.enabled).to.be.ok();
    });
    it('iscroll-lite should has prototype enabled', function() {
      expect(lite.prototype.enabled).to.be.ok();
    });
  });
});
