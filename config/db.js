const defaultConfig = {
    HOST                :   "localhost",
    USER                :   "ocs-admin",
    PASS                :   "blackdog",
    DATABASE            :   "ocs",
    CONNECTION_LIMIT    :   10,    
}

const serverConfig = {
    production : {
        HOST                :   "",
        USER                :   "",
        PASS                :   "",
        DATABASE            :   "ocs",
        CONNECTION_LIMIT    :   10,        
    }
}

class Db {
    constructor(env){
        this.host            = serverConfig[env] ? serverConfig[env].HOST : defaultConfig.HOST; 
        this.user            = serverConfig[env] ? serverConfig[env].USER : defaultConfig.USER; 
        this.pass            = serverConfig[env] ? serverConfig[env].PASS : defaultConfig.PASS; 
        this.database        = serverConfig[env] ? serverConfig[env].DATABASE : defaultConfig.DATABASE; 
        this.connectionLimit = serverConfig[env] ? serverConfig[env].CONNECTION_LIMIT : defaultConfig.CONNECTION_LIMIT; 
    }
}

module.exports = Db;
