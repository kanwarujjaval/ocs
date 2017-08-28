const UserModel = require('../userModel');
const SessionModel = require('../../session/sessionModel');
const BatchModel = require('../../batch/batchModel');

class FacultyHelper {
    static fetchSessionData(dataWrapper) {
        return new Promise((resolve, reject) => {
            (async () => {
                try {

                    /* 
                        TODO -
                        dataWrapper.authUserData._id has to come from auth
                    
                    */
                    let queryWrapper = {
                        query: {
                            endTime: {
                                $gt: new Date()
                            },
                            'batchInfo.facultyId': dataWrapper.authUserData._id
                        },
                        fields: {},
                        limit: 0,
                        skip: 0
                    };

                    let currentSessionData = await SessionModel.find(queryWrapper.query, queryWrapper.fields);

                    let batchIds = currentSessionData.map((currSessObj) => {
                        return currSessObj.batchId;
                    });

                    queryWrapper = {
                        query: {
                            _id: { $in: batchIds }
                        },
                        fields: {},
                        limit: 0,
                        skip: 0
                    };

                    let batchData = await BatchModel.find(queryWrapper.query, queryWrapper.fields);

                    let responseWrapper = {
                        sessionData: currentSessionData,
                        batchData: batchData
                    };

                    /* 
                        TODO - 
                        JOIN THE ABOVE TWO QUERIES IN SINGLE QUERY AND SEND IN A SINGLE KEY RATHER THEN AN OBJECT
                    */
                    resolve(responseWrapper);
                } catch (err) {
                    reject(err);
                }
            })();
        });
    }
}

module.exports = FacultyHelper;