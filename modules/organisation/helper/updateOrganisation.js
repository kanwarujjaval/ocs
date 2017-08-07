let OrganisationModel = require('../organisationModel');

/**
 * @class UpdateOrganisation
 * @lends Organisation
 */
class UpdateOrganisation {
    /**
     * Function to update the organisation
     * 
     * @param {Object} data
     * @returns {Function} Organisation Model
     * @memberof Organisation
     */
    static update (data, criteria) {
        return OrganisationModel.update(criteria, data);
    }
}

module.exports = UpdateOrganisation;
