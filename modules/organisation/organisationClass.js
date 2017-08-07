const UpdateOrganisationHelper = require('./helper/updateOrganisation');
const PostOrganisationHelper = require('./helper/postOrganisation');
const Util = require('../../utils');

/** Organisation module class */
class Organisation {
    /**
     * Saves the organisation posted by the user
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @returns 
     * @memberof Organisation
     */
    async postOrganisation (req, res) {
        try {
            let data = req.body;
            let result = null;

            // TODO : implement auth check
            result = await PostOrganisationHelper._saveOrganisation(data);

            result = Util.successHandler(result);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }

    /**
     * Updates the organisation
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @returns 
     * @memberof Organisation
     */
    async updateOrganistaion (req, res) {
        try {
            let data = req.body;
            let criteria = {_id: req.body._id};
            let result = null;

            // TODO : implement auth check
            UpdateOrganisationHelper._updateOrganisation(data, criteria).catch(Util.silentErrorHandler);

            result = Util.successHandler(result);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }
}

module.exports = Organisation;
