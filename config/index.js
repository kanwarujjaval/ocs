/** Config class for module management */
var Server = require('./server');
var Db     = require('./db');

class Config {
    constructor(env){
        this._env = env;
    }

    getServerConfig(){
        return {        
            SERVER : new Server(this._env),
        }
    }

    getDbConfig(){
        return {
            DB : new Db(this._env),
        }
    }
}

module.exports = Config;