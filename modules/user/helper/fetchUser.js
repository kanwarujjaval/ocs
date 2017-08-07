let UserModel = require('../userModel');

class FetchUser {
    /**
     * Function to fetch the user from db
     * 
     * @param {Object} criteria object with key value pair for fetch user query
     * @param {Number} limit
     * @param {Number} skip
     * @returns {array}
     * @memberof User
     */
    static _fetchUser (criteria, limit, skip) {
        return UserModel.find(criteria).limit(limit).skip(skip);
    }
}

module.exports = FetchUser;
