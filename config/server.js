const defaultConfig = {
    HTTP_PORT : 3000
}

const serverConfig = {
    production : {
        HTTP_PORT : 3001
    }
}

class Server {
    constructor(env){
        this.httpPort = serverConfig[env] ? serverConfig[env].HTTP_PORT : defaultConfig.HTTP_PORT;
    }
}

module.exports = Server;