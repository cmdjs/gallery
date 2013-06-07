define(function(require) {
  var module = require('./dist/list');
  describe('list', function() {
    it('should has List & ListJsHelpers', function() {
      expect(module.List).to.be.a('function');
      expect(module.List.prototype.templateEngines.standard).to.be.a('function');      
      expect(module.ListJsHelpers.getByClass).to.be.a('function');
    });
  });
});

