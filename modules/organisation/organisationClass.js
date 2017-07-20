const OrganisationModel = require('./organisationModel');
const UpdateOrganisationHelper = require('./helper/updateOrganisation');
const Util = require('../../utils');

/** Organisation module class */
class Organisation {
    async updateOrganistaion(req, res) {
        try {
            let data = req.body;
            let criteria = {_id : req.body._id};
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