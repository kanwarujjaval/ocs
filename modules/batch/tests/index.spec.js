const assert = require('assert');
const Batch = require('./../batchClass');

describe('batch module', function () {
    describe('#indexOf()', function () {
        it('should return -1 when the value is not present', function () {
            assert.equal(-1, [1, 2, 3].indexOf(4));
            let batch = new Batch();
            assert.equal(true, batch instanceof Batch);
        });
    });
});
