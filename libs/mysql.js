var ENV       = process.env.NODE_ENV || 'development';
var CONFIG    = require('../config')(ENV);

var mysql           = require('mysql');

var dbPoolConfig = {
    host            : CONFIG.DB.HOST,
    user            : CONFIG.DB.USER,
    password        : CONFIG.DB.PASS,
    database        : CONFIG.DB.DATABASE,
    connectionLimit : CONFIG.DB.CONNECTION_LIMIT
};

var numConnectionsInPool = 0;

function initializePool(dbPoolConfig){
    var dbConnectionsPool = mysql.createPool(dbPoolConfig);

    dbConnectionsPool.on('connection', function (connection) {
        numConnectionsInPool++;
        console.log("Connections in pool : ", numConnectionsInPool);
    });
    return dbConnectionsPool;
}

var dbConnectionsPool = initializePool(dbPoolConfig);

exports.dbHandler = {
    executeQuery : function(queryObject, callback){
        var finalQuery = dbConnectionsPool.query(queryObject.sql, queryObject.args, function(err, result){
            if(err){
                return queryObject.callback(err, result);
            }

            return queryObject.callback(err, result);
        });

        return finalQuery;
    },
};