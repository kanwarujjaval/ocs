let UserModel = require('../userModel');

class PostUser {
    /**
     * Function to save the user in db
     * 
     * @param {Object} data
     * @returns 
     * @memberof User
     */
    static _saveUser (data) {
        return new UserModel(data).save();
    }
}

module.exports = PostUser;
