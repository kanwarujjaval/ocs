const jsonwebtoken = require('jsonwebtoken');
const AuthSession = require('./authSessionModel');
const User = require('../modules/user/userModel');
const Util = require('../utils');

/** 
 * Main Auth class for Authentication 
 * */
class Auth {
    /**
     * create a new Auth Object
     * sets config for the instance
     * sets authSessionId for the instance
     * 
     * @param {Object} config - Instance of Config class.
     */
    constructor(config) {
        this._config = config;
        this.authSessionId = null;
    }

    /**
     * generates an access token for a authSessionId id
     * 
     * @param {String} authSessionId authSessionId from mongo authSession collection
     * @returns {String} accessToken
     */
    generateToken(authSessionId) {
        return jsonwebtoken.sign(authSessionId, this._config.SERVER.JWT_SECRET);
    }

    /**
     * validate a authSessionId Id
     *
     * @returns {Object} valid authSession Object
     * @throws {Error} AuthSession does not exist {if no authSession found}
     */
    async validate() {
        let authSession = await AuthSession.find(
            { _id: this.authSessionId, valid: true },
            { createdAt: -1, limit: 1 },
            { lean: true }
        );
        if (authSession.length) {
            return authSession[0];
        }
        throw new Error('AuthSession does not exist');
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
                    this.authSessionId = jsonwebtoken.verify(accessToken, this._config.SERVER.JWT_SECRET);
                    let authSession = this.validate();
                    let user = await User.find(
                        { _id: authSession.userId },
                        { password: 0 },
                        { lean: true }
                    );
                    if (user.length) {
                        req.auth = {
                            user: user[0],
                            token: accessToken,
                            authSession: authSession
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
     * create a new authSession for a user
     * 
     * @param {ObjectId} authSessionData.userId User Id
     * @param {String} authSessionData.deviceId Unique device Id
     * @param {String} authSessionData.deviceToken Device Token
     * @param {String} authSessionData.deviceType Device type [IOS, ANDROID, WEB]
     * @param {String} authSessionData.ip Ip address of request
     * @returns {String} accessToken
     */
    async createAuthSession(authSessionData) {
        let authSession = await new AuthSession(authSessionData).save();
        let token = this.generateToken(authSession._id);
        return token;
    }

    /**
     * Destroy authSession(s)
     * request must be authenticated before calling logout
     * 
     * @param {boolean} flushAll logout user from all authSessions
     * @returns {Function} express middleware/handler
     */
    logout(flushAll = false) {
        return (req, res, next) => {
            return () => {
                let query = flushAll ? { userId: req.auth.user._id } : { _id: req.auth.authSession._id };
                AuthSession.findOneAndUpdate(
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
