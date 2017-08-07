const Util = require('./../utils');
let server = require('./server');
let mysql = require('./mysql');
let mongo = require('./mongo');

/** Config class for global Configs */
class Config {
    /**
     * create a new config
     * @param {String} env - The process environment.
     */
    constructor (env) {
        this._env = env;
        this.SERVER = server(this._env);
        this.MYSQL = mysql(this._env);
        this.MONGO = mongo(this._env);
    }

    /**
     * Update Config with latest values in config files.
     */
    reloadConfig () {
        let server = Util.hotRequire('./server');
        this.SERVER = server(this._env);

        let mysql = Util.hotRequire('./mysql');
        this.MYSQL = mysql(this._env);

        let mongo = Util.hotRequire('./mongo');
        this.MONGO = mongo(this._env);
    }
}

module.exports = Config;
