const defaultConfig = {
    HTTP_PORT : 3000
}

const serverConfig = {
    production : {
        HTTP_PORT : 3001
    }
}

let Server = (Base) => class extends Base {
    constructor(env){
        super(env);
        this.httpPort = serverConfig[env] ? serverConfig[env].HTTP_PORT : defaultConfig.HTTP_PORT;
    }
}

module.exports = Server;