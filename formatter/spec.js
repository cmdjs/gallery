define(function(require) {
  var module = require('./dist/formatter');
  describe('formatter', function() {
    it('should be a constructor', function() {
      expect(module).to.be.a('function');
      expect(new module(document.createElement('input'), {
        'pattern': '{{999}}-{{999}}-{{999}}-{{9999}}'
      })).to.be.a('object');
    });
    it('instance should have resetPattern function', function() {
      expect(new module(document.createElement('input'), {
        'pattern': '{{999}}-{{999}}-{{999}}-{{9999}}'
      }).resetPattern).to.be.a('function');
    });
  });
});
