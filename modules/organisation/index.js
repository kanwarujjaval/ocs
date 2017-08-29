const Organisation = require('./organisationClass');
let organisation = new Organisation();

module.exports = [
    {
        path: '/add_organisation',
        method: 'POST',
        auth: false,
        roles: ['ADMIN'],
        handler: (req, res) => {
            return organisation.addOrganisation(req, res);
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
