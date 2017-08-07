const jsonwebtoken = require('jsonwebtoken');
const UserFetchHelper = require('../modules/user/helper/fetchUser');
const Util = require('../utils');

/*

require user Class USER

*/

/** Main Auth class for Authentication */
class Auth {
    /**
     * create a new Authentication Object
     * @param {Object} config - Instance of Config class.
     */
    constructor (config) {
        this._config = config;
        this.user = null;
        this.authData = null;
    }

    _generateToken (data) {
        let payload = {
            userId: data._id
        };
        let token = jsonwebtoken.sign(payload, this._config.SERVER.JWT_SECRET);
        return token;
    }

    _authenticate () {
        let token = this._generateToken(this.user);
        this.authData = {
            token: token,
            sessionStart: Date.now()
        };
    }

    _authorize () {

    }

    _serialize () {
        let user = this.user;
        // delete non required fields
        user.authData = this.authData;
        return user; // jo database se niklega
    }

    _deserialize () {
        return null; // ya id req.auth = null
    }

    authenticate () {
        return (req, res, next) => {
            return async () => {
                try {
                    let criteria = {
                        phoneNo: req.body.phoneNo,
                        password: req.body.password
                    };

                    let User = await UserFetchHelper._fetchUser(criteria);
                    this.user = User;
                    this._authenticate();

                    req.auth = this.authData;
                    next();
                } catch (error) {
                    let result = Util.errorHandler(error);
                    return res.status(result.status).send(result);
                }
            };
        };
    }

    logout () {
    // set session as invalidated in db
    // set device specific data as logged out
        return (req, res, next) => {
            req.auth = (() => {
                return this._deserializeUser();
            })();
            next();
        };
    }
}

module.exports = Auth;
