const Organisation  = require('./organisationClass');
let organisation    = new Organisation();

/**
 * @module Organisation
 * Sample module index expose
 * @exports {Array)
 *
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
        roles: '',
        validate: () => {
            return 
        },
        handler: (req, res) => {
            return organisation.postOrganisation(req, res);
        }
    }
];