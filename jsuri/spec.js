define(function(require) {
  var module = require('./dist/jsuri');
  var uri = new module('http://user:pass@www.test.com:81/index.html?q=books#fragment');
  describe('jsuri', function() {
    it('should has protocol http', function() {
      expect(uri.protocol()).to.be.equal('http');
    });
    it('should has host www.test.com', function() {
      expect(uri.host()).to.be.equal('www.test.com');
    });
  });
});
