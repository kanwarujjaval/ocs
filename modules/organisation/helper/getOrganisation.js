let OrganisationModel = require('../organisationModel');

/**
 * @class GetOrganisation
 * @lends Organisation
 */
class GetOrganisation {
    /**
     * Function to fetch the user from db
     * 
     * @param {Object} criteria object with key value pair for fetch user query
     * @param {Number} limit
     * @param {Number} skip
     * @returns {Array}
     * @memberof Organisation
     */
    static find(criteria, limit, skip) {
        return OrganisationModel.find(criteria).limit(limit).skip(skip);
    }
}

module.exports = GetOrganisation;
