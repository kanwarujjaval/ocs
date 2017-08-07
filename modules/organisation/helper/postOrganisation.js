let OrganisationModel = require('../organisationModel');

class PostOrganisation {
    /**
     * Function to save the organisation in db
     * 
     * @param {Object} data
     * @returns 
     * @memberof Organisation
     */
    static _saveOrganisation (data) {
        return new OrganisationModel(data).save();
    }
}

module.exports = PostOrganisation;
