const jsonwebtoken = require('jsonwebtoken');
const Session = require('./sessionModel');
const User = require('../modules/user/userModel');
const Util = require('../utils');

/** 
 * Main Auth class for Authentication 
 * */
class Auth {
    /**
     * create a new Auth Object
     * sets config for the instance
     * sets sessiodId for the instance
     * 
     * @param {Object} config - Instance of Config class.
     */
    constructor(config) {
        this._config = config;
        this.sessionId = null;
    }

    /**
     * generates an access token for a session id
     * 
     * @param {String} sessionId 
     * @returns {String} accessToken
     */
    generateToken(sessionId) {
        return jsonwebtoken.sign(sessionId, this._config.SERVER.JWT_SECRET);
    }

    /**
     * validate a session Id
     *
     * @returns {Object} valid session Object
     * @throws {Error} Session does not exist if no session found
     */
    async validate() {
        let session = await Session.find(
            { _id: this.sessionId, valid: true },
            { createdAt: -1, limit: 1 },
            { lean: true }
        );
        if (session.length) {
            return session[0];
        }
        throw new Error('Session does not exist');
    }

    /**
     * Authenticate middleware to be used within routes
     * 
     * @returns {Function} Middleware which accepts binding of request, response and next callbacks
     */
    authenticate() {
        return (req, res, next) => {
            return async () => {
                try {
                    let accessToken = req.get('authorization');
                    this.sessionId = jsonwebtoken.verify(accessToken, this._config.SERVER.JWT_SECRET);
                    let session = this.validate();
                    let user = await User.find(
                        { _id: session.userId },
                        { password: 0 },
                        { lean: true }
                    );
                    if (user.length) {
                        req.auth = {
                            user: user[0],
                            token: accessToken,
                            session: session
                        };
                        next();
                    }
                    throw new Error('Unable to find user');
                } catch (error) {
                    let result = Util.errorHandler(error);
                    return res.status(result.status).send(result);
                }
            };
        };
    }

    /**
     * create a new session for a user
     * 
     * @param {ObjectId} sessionData.userId User Id
     * @param {String} sessionData.deviceId Unique device Id
     * @param {String} sessionData.deviceToken Device Token
     * @param {String} sessionData.deviceType Device type [IOS, ANDROID, WEB]
     * @param {String} sessionData.ip Ip address of request
     * @returns {String} accessToken
     */
    async createSession(sessionData) {
        let session = await new Session(sessionData).save();
        let token = this.generateToken(session._id);
        return token;
    }

    /**
     * Destroy session(s)
     * request must be authenticated before calling logout
     * 
     * @param {boolean} [allDevices=false] logout user from all sessions
     * @returns {Function} express middleware/handler
     */
    logout(flushAll = false) {
        return (req, res, next) => {
            return () => {
                let query = flushAll ? { userId: req.auth.user._id } : { _id: req.auth.session._id };
                Session.findOneAndUpdate(
                    query,
                    {
                        $set: {
                            valid: false,
                            invalidedAt: Date.now
                        }
                    },
                    { new: true, lean: true }
                );
                req.auth = null;
                next();
            };
        };
    }
}

module.exports = Auth;
