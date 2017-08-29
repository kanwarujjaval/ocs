const SessionClass = require('./sessionClass');
let session = new SessionClass();

module.exports = [
    {
        path: '/fetch_session',
        method: 'POST',
        auth: false,
        roles: ['FACULTY', 'PARENT', 'STUDENT'],
        handler: (req, res) => {
            return session.fetchSession(req, res);
        }
    },
];
