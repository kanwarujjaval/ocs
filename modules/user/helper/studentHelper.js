const UserModel = require('../userModel');
const SessionModel = require('../../session/sessionModel');

class StudentHelper {
    static fetchSessionData(){
        return new Promise((resolve, reject) => {
            (async () => {
                try {

                    resolve();
                } catch (err) {
                    reject(err);
                }
            })();
        });
    }
}

module.exports = StudentHelper;