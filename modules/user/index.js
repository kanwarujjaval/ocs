const User = require('./userClass');
let user = new User();

/**
 * @module 
 * [Core] User Module
 * @property {String} path - Endpoint of the api Will be prefixed by module name
 * @property {String} method - one of 4 http verbs get/post/put/delete
 * @property {Boolean} auth - is authentication required
 * @property {function} validate - validate input for this api path
 * @property {Array} roles - array of authorized roles
 * @property {function} handler - final handler for the api path
 *
 * */
module.exports = [
    {
        path: '/',
        method: 'POST',
        auth: false,
        roles: [],
        handler: (req, res) => {
            return user.postUser(req, res);
        }
    },
    {
        path: '/',
        method: 'GET',
        auth: false,
        roles: [],
        handler: (req, res) => {
            return user.getUser(req, res);
        }
    },
    {
        path: '/',
        method: 'PUT',
        auth: false,
        roles: [],
        handler: (req, res) => {
            return user.updateUser(req, res);
        }
    }
];
