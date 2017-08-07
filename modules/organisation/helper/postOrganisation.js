let OrganisationModel = require('../organisationModel');
/**
 * @class PostOrganisation
 * @lends Organisation
 */
class PostOrganisation {
    /**
     * Function to save the organisation in db
     * 
     * @param {Object} data
     * @returns {Array}
     * @memberof Organisation
     */
    static save (data) {
        return new OrganisationModel(data).save();
    }
}

module.exports = PostOrganisation;
