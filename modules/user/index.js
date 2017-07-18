const User  = require('./userClass');
let user    = new User();

module.exports = [
    {
        path: '/',
        method: 'POST',
        auth: false,
        roles: [],
        handler: (req, res) => {
            return user.postUser(req, res)
        }
    },
    {
        path: '/',
        method: 'GET',
        auth: false,
        roles: [],
        handler: (req, res) => {
            return user.getUser(req, res)
        }
    }
];