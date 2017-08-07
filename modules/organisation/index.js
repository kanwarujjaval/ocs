const Organisation = require('./organisationClass');
let organisation = new Organisation();

module.exports = [
    {
        path: '/',
        method: 'POST',
        auth: false,
        roles: [],
        handler: (req, res) => {
            return organisation.postOrganisation(req, res);
        }
    },
    {
        path: '/',
        method: 'PUT',
        auth: false,
        roles: [],
        handler: (req, res) => {
            return organisation.updateOrganistaion(req, res);
        }
    }
];
