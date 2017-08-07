let UserModel = require('../userModel');

class UpdateUser {
    /**
     * Function to update the user
     * 
     * @param {Object} data
     * @returns 
     * @memberof User
     */
    static _updateUser (data, criteria) {
        return UserModel.update(criteria, data);
    }
}

module.exports = UpdateUser;
