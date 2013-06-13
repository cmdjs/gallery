define(function(require) {
  var module = require('./dist/list');
  describe('list', function() {
    it('should has List & ListJsHelpers', function() {
      expect(module.List).to.be.a('function');
      expect(module.List.prototype.templateEngines.standard).to.be.a('function');      
      expect(module.ListJsHelpers.getByClass).to.be.a('function');
      expect(window.List).to.be(undefined);
      expect(window.ListJsHelpers).to.be(undefined);
      console.log(module.List.prototype.plugins);
      expect(module.List.prototype.plugins).to.be.a('object');
      expect(module.List.prototype.plugins.paging).to.be.a('function');
      expect(module.List.prototype.plugins.fuzzySearch).to.be.a('function');
    });
  });
});

