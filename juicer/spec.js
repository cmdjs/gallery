define(function(require) {
    var module = require('./dist/juicer');
    describe('juicer', function() {
        it('should has name: juicer.js', function() {
            expect(module.name).to.equal('juicer.js');
        });
    });
});
