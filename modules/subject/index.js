const Subject = require('./subjectClass');
let subject = new Subject();

module.exports = [
    /**
     * @method GET /subject/
     * @property {GET} /subject/ Fetch Subject data from database
     * @param {String} subjectId
     * @returns {Array} Array of subjects
     */
    {
        path: '/',
        method: 'GET',
        auth: false,
        roles: [],
        handler: (req, res) => {
            return subject.getSubject(req, res);
        }
    },

    /**
     * @method GET /subject/all
     * @property {GET} /subject/all Fetch all subjects
     * @returns {Array} Array of subjects
     */
    {
        path: '/all',
        method: 'GET',
        auth: false,
        roles: [],
        handler: (req, res) => {
            return subject.getAllSubjects(req, res);
        }
    }
];
