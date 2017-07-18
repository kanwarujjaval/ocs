const UserModel         = require('./userModel');

const OrganisationClass = require('../organisation/organisationClass');
const Util              = require('./../../utils')

/** User module class */
class User {

    /**
     * SAVE users end point
     * 
     * @param {any} req 
     * @param {any} res 
     * @memberof User
     */
    async postUser(req, res) {
        try {

            let data = req.body;

            let parallelTasks = [
                this.saveUser.bind(null, data)
            ];

            if (!req.body.isAuthenticated) {
                let organisation = new OrganisationClass();
                parallelTasks.push(organisation.saveOrganisation.bind(null, data));
            }

            let result = await Util.runTasksInParallel(parallelTasks);

            result = Util.successHandler(result);
            return res.status(result.status).send(result);

        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }

    /**
     * GET user end point
     * 
     * @param {any} req 
     * @param {any} res 
     * @returns 
     * @memberof User
     */
    async getUser(req, res) {
        try {

            let data = req.query;

            let result = await this.fetchUser(data);

            result = Util.successHandler(result);
            return res.status(result.status).send(result);

        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }

    /**
     * Function to save the user in db
     * 
     * @param {any} user 
     * @returns 
     * @memberof User
     */
    async saveUser(data) {
        return new Promise((resolve, reject) => {
            let user = new UserModel(data);
            user.save().then((result) => {
                return resolve(result);
            }).catch((error) => {
                return reject(error);
            });
        })
    };

    /**
     * Function to fetch the user from db
     * 
     * @param {any} data 
     * @returns 
     * @memberof User
     */
    async fetchUser(data) {
        return new Promise((resolve, reject) => {
            UserModel.find({ phoneNo : data.phoneNo}).exec().then((result) => {
                return resolve(result);
            }).catch((error) => {
                return reject(error);
            });
        })
    };
}

module.exports = User;