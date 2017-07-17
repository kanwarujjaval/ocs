const Organisation  = require('./organisationClass');

let organisation    = new Organisation();

module.exports = [
    {
        path: '/',
        method: 'POST',
        auth: false,
        roles: [],
        handler: (req, res) => {
            return
        }
    }
];