const jsonwebtoken = require('jsonwebtoken');

/** Main Auth class for Authentication */
class Auth {

    /**
     * create a new Authentication Object
     * @param {Object} config - Instance of Config class.
     */
    constructor(config){
        this._config  = config;
    }

    authenticate(){

    }

    serialize(){

    }

    deserialize(){

    }
}

module.exports = Auth;