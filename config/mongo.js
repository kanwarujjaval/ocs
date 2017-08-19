const common = {
    HOST: process.env.MONGO_HOST || 'localhost',
    USER: process.env.MONGO_USER || '',
    PASS: process.env.MONGO_PASS || '',
    PORT: process.env.MONGO_PORT || 27017,
    DATABASE: process.env.MONGO_DB || 'ocs'
};

const specific = {
    development: {
        POOL_SIZE: 2,
        DEBUG: true
    },
    testing: {
        POOL_SIZE: 4,
        DEBUG: true
    },
    staging: {
        POOL_SIZE: 8,
        DEBUG: true
    },
    production: {
        POOL_SIZE: 10,
        DEBUG: false
    }
};

const config = (ENV) => {
    return Object.assign(specific[ENV], common);
};

module.exports = config;
