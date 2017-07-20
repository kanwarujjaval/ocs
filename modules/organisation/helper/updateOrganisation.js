let OrganisationModel = require('../organisationModel');

class UpdateOrganisation {
    /**
     * Function to update the organisation
     * 
     * @param {Object} data
     * @returns 
     * @memberof Organisation
     */
    static _updateOrganisation(data, criteria) {
        return OrganisationModel.update(criteria, data);
    };
}

module.exports = UpdateOrganisation;