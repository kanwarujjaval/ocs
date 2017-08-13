const User = require('./userClass');
let user = new User();

/**
 * User Module
 * @module [Core]/User
 * */
module.exports = [
    /**
     * @method Login
     * @description  GET user/login
     * @param {Number} phoneNo - Users phone number (required)
     * @param {String} password - Users password (optional)
     * @param {String} password - Users password (optional)
     * @return {Object} User data and access token
     * @example
     * {
        accessToken: { type: String },
        user: {
            firstName: { type: String, required: true },
            middleName: { type: String, default: null },
            lastName: { type: String, required: true },
            phoneNo: { type: String, required: true },
            email: { type: String, required: true },
            address1: { type: String, default: null },
            address2: { type: String, default: null },
            city: { type: String, default: null },
            country: { type: String, required: true }
        }
    }
     */
    {
        path: '/login',
        method: 'POST',
        auth: false,
        roles: ['ADMIN', 'TEACHER', 'PARENT', 'STUDENT', 'STAFF'],
        handler: (req, res) => {
            return user.login(req, res);
        }
    }
];
