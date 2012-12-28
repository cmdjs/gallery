define(function(require) {
    var module = require('./dist/juicer');
    describe('juicer', function() {
        it('should has name: juicer.js', function() {
            expect(module.version).to.equal('0.6.4-stable');
        });
    });
});
