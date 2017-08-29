const SessionHelper = require('./helper/sessionData');
const Util = require('../../utils');

/** session module class */
class Session {
    async fetchSession(req, res){
        try {
            let dataWrapper = {
                body: req.body,
                authData: req.authData
            };

            let result = SessionHelper.fetchSessionData(dataWrapper);

            let response = {
                userData: result
            };

            result = Util.successHandler(response);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }
}

module.exports = Session;
