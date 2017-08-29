const OrganisationModel = require('./organisationModel');
const Util = require('../../utils');

/**
 * Organisation module class 
 * @extends AddOrganisation
 * @extends GetOrganisation
 * @extends UpdateOrganisation
 * */
class Organisation {
    /**
     * Saves the organisation posted by the user
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @returns {response} response.status().send()
     */
    async addOrganisation (req, res) {
        try {
            let data = req.body;
            let result = null;

            // TODO : implement auth check
            result = await new OrganisationModel(data).save();

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
     * @param {Request} req 
     * @param {Response} res 
     * @returns {response} response.status().send()
     */
    async updateOrganistaion (req, res) {
        try {
            let data = req.body;
            let criteria = {_id: req.body._id};
            let result = null;

            // TODO : implement auth check
            OrganisationModel.update(criteria, data).catch(Util.silentErrorHandler);

            result = Util.successHandler(result);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }
}

module.exports = Organisation;
