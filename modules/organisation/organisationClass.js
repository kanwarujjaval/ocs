const OrganisationModel = require('./organisationModel');

/** Organisation module class */
class Organisation {
    /**
     * Function to save the organisation in db
     * 
     * @param {any} organisation 
     * @returns 
     * @memberof Organisation
     */
    async saveOrganisation(data) {
        return new Promise((resolve, reject) => {
            let organisation = new OrganisationModel(data);
            organisation.save().then((result) => {
                return resolve(result);
            }).catch((error) => {
                return reject(error);
            });
        })
    };
}

module.exports = Organisation;