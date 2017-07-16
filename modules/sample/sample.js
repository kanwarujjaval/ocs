/** Sample module class */
class Sample {

    /**
     * creates a sample module
     * */
    constructor() {
        this.foo = 1;
    }

    /**
     * handle GET sample request
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @return {Function} response function call
     * */
    async getSample(req, res) {
        // mysql usage

        // let query  = 'SELECT * FROM `books` WHERE `author` = ?';
        // let values = ['David'];
        // let result = await req.sql({
        //     sql     : query,
        //     timeout : 40 * 1000,
        //     values  : values
        // });

        return res.send('result');
    }

    /**
     * Validate GET sample method input
     * @returns {function} next/response for validation success/failure
     * */
    async getSampleValidator(req, res, next) {
        /*
        sample validation
        (
            validator.isEmail(req.body.email)
            * validator.isISO8601(req.body.date)
            * validator
        ) ?
            next()
            :
            res.send(new Error('Validation Error'));
         */
    }

    /**
     * Get allowed roles for GET sample method
     * @returns {Array} of roles allowed to access
     * */
    getSampleRoles() {
        return ['admin']
    }

    /**
     * Validate POST sample method input
     * @returns {function} next/response for validation success/failure
     * */
    postSampleValidator(req, res, next) {
        /*
         sample validation
         (
         validator.isEmail(req.body.email)
         * validator.isISO8601(req.body.date)
         * validator
         ) ?
         next()
         :
         res.send(new Error('Validation Error'));
         */
    }

    /**
     * Get allowed roles for POST sample method
     * @returns {Array} of roles allowed to access
     * */
    postSampleRoles() {
        return ['admin']
    }

    /**
     * handle POST sample request
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @return {Function} response function call
     * */
    async postSample(req, res) {
        let query  = 'SELECT * FROM `books` WHERE `author` = ?';
        let values = ['David'];
        let result = await req.sql({
            sql     : query,
            timeout : 40 * 1000,
            values  : values
        });
        return res.send(result);
    }
}

module.exports = Sample;