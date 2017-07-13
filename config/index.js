/** Config class for module management */
var Server = require('./server');
var Db     = require('./db');

class CommonConfig {
    constructor(env){
        this._env = env;
    }
}

class Config extends Server(Db(CommonConfig)){}

module.exports = Config;