define(function(require) {
  var module = require('./dist/mustache');
  describe('mustache', function() {
    it('should has name: mustache.js', function() {
      expect(module.name).to.equal('mustache.js');
    });
  });
});
