const UpdateOrganisation = require('./helper/updateOrganisation');
const PostOrganisation = require('./helper/postOrganisation');
// const GetOrganisation = require('./helper/getOrganisation');
const Util = require('../../utils');

/**
 * Organisation module class 
 * @extends PostOrganisation
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
    async postOrganisation (req, res) {
        try {
            let data = req.body;
            let result = null;

            // TODO : implement auth check
            result = await PostOrganisation.save(data);

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
            UpdateOrganisation.update(data, criteria).catch(Util.silentErrorHandler);

            result = Util.successHandler(result);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }
}

module.exports = Organisation;
