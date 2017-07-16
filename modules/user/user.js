const userModel = require('./userModel');

/** User module class */
class User {

    /**
     * handle GET User request
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @return {Function} response function call
     * */
    async getUserData(req, res) {
        let userData = await userModel.find({});
        return res.send(userData);
    }
}

module.exports = User;