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
     * @memberof Auth
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
     * @param {ObjectId} sessionData.userId
     * @param {String} sessionData.deviceId
     * @param {String} sessionData.deviceToken
     * @param {String} sessionData.deviceType
     * @returns {String} accessToken
     */
    async createSession(sessionData) {
        let session = await new Session(sessionData).save();
        let token = this.generateToken(session._id);
        return token;
    }

    /**
     * Logout a session
     *
     */
    logout() {
        return (req, res, next) => {
            return () => {
                let accessToken = req.get('authorization');
                let sessionId = jsonwebtoken.verify(accessToken, this._config.SERVER.JWT_SECRET);
                Session.findOneAndUpdate(
                    { _id: sessionId },
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
            }
        };
    }
}

module.exports = Auth;
