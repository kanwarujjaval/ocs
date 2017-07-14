const Util = require('./../utils');
let server = require('./server');
let db     = require('./db');

/** Config class for module management */
class Config {
    constructor(env){
        this._env   = env;
        this.SERVER = server(this._env);
        this.DB     = db(this._env);
    }

    reloadConfig(){
        let server  = Util.hotRequire('./server');
        let db      = Util.hotRequire('./db');
        this.SERVER = server(this._env);
        this.DB     = db(this._env);
    }
}

module.exports = Config;