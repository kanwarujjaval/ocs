const Batch = require('./batchClass');
let batch = new Batch();

module.exports = [
    /**
     * @method GET /batch/all
     * @property {GET} /batch/all Fetch all batches 
     * @returns {Array} Array of batches
     */
    {
        path: '/all',
        method: 'GET',
        auth: false,
        roles: [],
        handler: (req, res) => {
            return batch.getAllBatches(req, res);
        }
    }
];
