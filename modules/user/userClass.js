const UserModel = require('./userModel');
const Util = require('./../../utils');
const PostUserHelper = require('./helper/postUser');
const FetchUserHelper = require('./helper/fetchUser');
const UpdateUserHelper = require('./helper/updateUser');

/** User module class */
class User {

    /**
     * POST users end point
     * 
     * @param {Object} req
     * @param {Object} res
     * @memberof User
     */
    async postUser(req, res) {
        try {
            let data = req.body;
            let result = null;

            // TODO : implement auth check
            PostOrganisationHelper._saveOrganisation(data).catch(Util.silentErrorHandler);
            PostUserHelper._saveUser(data).catch(Util.silentErrorHandler);

            result = Util.successHandler(result);
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
     * @returns 
     * @memberof User
     */
    async getUser(req, res) {
        try {

            let data = req.query;

            let result = await FetchUserHelper._fetchUser(data);

            result = Util.successHandler(result);
            return res.status(result.status).send(result);

        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }

    /**
     * 
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @returns 
     * @memberof User
     */
    async updateUser(req, res) {
        try {

            let data = req.body;
            let criteria = { _id : req.body.id };
            let result = null;

            UpdateUserHelper._updateUser(data, criteria).catch(Util.silentErrorHandler);

            result = Util.successHandler(result);
            return res.status(result.status).send(result);

        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }
}

module.exports = User;