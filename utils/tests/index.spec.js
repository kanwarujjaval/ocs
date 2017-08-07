const expect = require('chai').expect;
const Util = require('../index');

describe('Utilities tests', function () {

    describe('Validate Methods', function () {
        it('expect a lowercase get', function () {
            expect(Util.validateMethod('GET')).to.equal('get');
        });
        it('expect a null on wrong input', function () {
            expect(Util.validateMethod('INVALID')).to.equal(null);
        });
    });
    
});
