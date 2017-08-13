const Util = require('./../../utils');
const UserModel = require('./userModel');

/**
 *  User module class 
 * */
class User {
    /**
     * POST users end point
     * 
     * @param {Object} req
     * @param {Object} res
     * @returns {response}
     */
    async postUser(req, res) {
        try {
            let data = req.body;

            let result = await new UserModel(data).save();

            /* TODO GENERATE OTP FOR VALIDATION */

            let response = {
                userData: result
            };

            result = Util.successHandler(response);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }

    /**
     * GET user end point
     * 
     * @param {Object} req
     * @param {Object} res
     * @returns {response}
     */
    async getUser(req, res) {
        try {
            let data = req.query;

            let result = await UserModel.find({}).limit(data.limit).skip(data.skip);

            result = Util.successHandler(result);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }

    /**
     * Update user end point
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @returns {response}
     */
    async updateUser(req, res) {
        try {
            let data = req.body;
            let criteria = { _id: req.body.id };
            let result = null;
            UserModel.update(criteria, data);

            result = Util.successHandler(result);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }
}

module.exports = User;
