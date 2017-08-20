const Util = require('./../../utils');
const SubjectModel = require('./subjectModel');

/**
 * @class Subject
 */
class Subject {
    /**
     * Fetch subject data from the database.
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @returns 
     * @memberof Subject
     */
    async getSubject(req, res) {
        try {
            let data = req.query;

            let subjectId = data.subjectId;

            let queryWrapper = {
                query:{
                    _id: subjectId                    
                },
                fields: {},
                limit: 0,
                skip: 0
            };

            let subjectData = await SubjectModel.find(queryWrapper.query, queryWrapper.fields);

            let result = Util.successHandler(subjectData);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }

    /**
    * Fetch all subjects from the database.
    * 
    * @param {Object} req 
    * @param {Object} res 
    * @returns 
    * @memberof Subject
    */
    async getAllSubjects(req, res) {
        try {

            let queryWrapper = {
                query: {},
                fields: {},
                limit: 0,
                skip: 0
            };

            let subjectData = await SubjectModel.find(queryWrapper.query, queryWrapper.fields);

            let result = Util.successHandler(subjectData);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }
}

module.exports = Subject;