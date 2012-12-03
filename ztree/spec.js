define(function(require) {
  require('./dist/ztree');
  var module = require('$');
  describe('jquery ztree', function() {
    it('should has zTree object', function() {
      expect(module.fn.zTree).to.be.a('object');
    });
  });
});
