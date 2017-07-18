const UserModel         = require('./userModel');
const OrganisationClass = require('../organisation/organisationClass');
const Util              = require('./../../utils');

/** User module class */
class User {

    /**
     * SAVE users end point
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
            let organisation = new OrganisationClass();

            organisation.saveOrganisation(data).catch(Util.silentErrorHandler);
            this._saveUser(data).catch(Util.silentErrorHandler);

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

            let result = await this.fetchUser(data);

            result = Util.successHandler(result);
            return res.status(result.status).send(result);

        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }

    /**
     * Function to save the user in db
     * 
     * @param {Object} data
     * @returns 
     * @memberof User
     */
    _saveUser(data) {
        return new UserModel(data).save();
    };

    /**
     * Function to fetch the user from db
     * 
     * @param {Object} criteria object with key value pair for fetch user query
     * @param {Number} limit
     * @param {Number} skip
     * @returns {array}
     * @memberof User
     */
    static fetchUser(criteria, limit, skip) {
            return UserModel.find(criteria).limit(limit).skip(skip);
    };
}

module.exports = User;