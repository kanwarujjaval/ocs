const OrganisationModel = require('./organisationModel');

/** Organisation module class */
class Organisation {
    /**
     * Function to save the organisation in db
     * 
     * @param {Object} data
     * @returns 
     * @memberof Organisation
     */
    saveOrganisation(data) {
            return new OrganisationModel(data).save();
    };
}

module.exports = Organisation;