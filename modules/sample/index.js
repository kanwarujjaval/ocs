const Sample = require('./sample');
let sample = new Sample();

/**
 * @module
 * Sample Module
 * @property {String} path - Endpoint of the api Will be prefixed by module name
 * @property {String} method - one of 4 http verbs get/post/put/delete
 * @property {Boolean} auth - is authentication required
 * @property {function} validate - validate input for this api path
 * @property {Array} roles - array of authorized roles
 * @property {function} handler - final handler for the api path
 *
 * */
module.exports = [
    /**
     * @method GET /sample/
     * @property {GET} /sample/ Fetch and array of Sample
     * @param {String} id optional 
     * @returns {Array.<{id: String, key1: String, key2: Array}>} Sample Array
     */
    {
        path: '/',
        method: 'GET',
        auth: true,
        roles: sample.getSampleRoles(),
        validate: () => {
            return sample.getSampleValidator;
        },
        handler: (req, res) => {
            return sample.getSample(req, res);
        }
    },
    /**
     * @method POST /sample/
     * @property {POST} /sample/ INSERT and instance of Sample
     * @param {String} id required 
     * @returns {Object.<{id: String, key1: String, key2: Array}>} SAMPLE INSERTED
     */
    {
        path: '/',
        method: 'POST',
        auth: true,
        roles: sample.postSampleRoles(),
        validate: () => {
            return sample.postSampleValidator;
        },
        handler: (req, res) => {
            return sample.postSample(req, res);
        }
    }
];
