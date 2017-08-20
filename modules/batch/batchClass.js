const Util = require('./../../utils');
const BatchModel = require('./batchModel');

/**
 * @class batch
 */
class Batch {

    /**
    * Fetch all batches from the database.
    * 
    * @param {Object} req 
    * @param {Object} res 
    * @returns 
    * @memberof batch
    */
    async getAllBatches(req, res) {
        try {

            let queryWrapper = {
                query: {},
                fields: {},
                limit: 0,
                skip: 0
            };

            let batchData = await BatchModel.find(queryWrapper.query, queryWrapper.fields);

            let result = Util.successHandler(batchData);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }
}

module.exports = Batch;