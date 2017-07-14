const common = {
    HOST                :   process.env.MYSQL_HOST          || 'localhost',
    USER                :   process.env.MYSQL_USER          || 'user',
    PASS                :   process.env.MYSQL_PASS          || 'password',
    DATABASE            :   process.env.MYSQL_DB            || 'OCS',
    CHARSET             :   'utf8mb4',
};

const specific = {
    development: {
        CONNECTION_LIMIT    :   2,
        TRACE               :   true,
        DEBUG               :   ['ComQueryPacket', 'ResultSetHeaderPacket']
    },
    testing: {
        CONNECTION_LIMIT    :   4,
        TRACE               :   true,
        DEBUG               :   ['ComQueryPacket', 'ResultSetHeaderPacket']
    },
    staging: {
        CONNECTION_LIMIT    :   8,
        TRACE               :   true,
        DEBUG               :   ['ComQueryPacket', 'ResultSetHeaderPacket']
    },
    production: {
        CONNECTION_LIMIT    :   12,
        TRACE               :   false,
        DEBUG               :   false
    }
};

const config = (ENV) => {
    return Object.assign(specific[ENV], common);
};

module.exports = config;