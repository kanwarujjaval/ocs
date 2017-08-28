const UserModel = require('../userModel');
const SessionModel = require('../../session/sessionModel');

class AdminHelper {
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

module.exports = AdminHelper;