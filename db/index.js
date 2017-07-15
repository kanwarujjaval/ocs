const Mysql    = require('mysql');
const Bluebird = require('bluebird');

Bluebird.promisifyAll(Mysql);
Bluebird.promisifyAll(require("mysql/lib/Connection").prototype);
Bluebird.promisifyAll(require("mysql/lib/Pool").prototype);

/** Database class for database handling */
class Database {

    /**
     * create a new database
     * @param {Object} config - Instance of Config class.
     */
    constructor(config){
        this._config  = config;
    }

    /**
     * create a new Pool
     * @returns {function} that returns Mysql Pool
     */
    _mysqlPool() {
        return () =>{
            let config = this._config.MYSQL;
            return Mysql.createPool({
                connectionLimit     : config.CONNECTION_LIMIT,
                host                : config.HOST,
                user                : config.USER,
                password            : config.PASS,
                database            : config.DATABASE,
                trace               : config.TRACE,
                debug               : config.DEBUG,
                charset             : config.CHARSET,
                multipleStatements  : true
            });
        }
    };

    /**
     * Get a connection from Mysql Pool
     * @returns {function} that returns connection from pool with attached bluebird disposer
     */
    _getMysqlConnection() {
        return ()=> {
            return this._mysqlPool()().getConnectionAsync().disposer((connection) => {
                return connection.release();
            });
        }
    };

    /**
     * Run a query on Mysql Connection
     * @returns {function} that returns query function with attached blubird using property to call disposer on use end.
     */
    _mysqlQuery(command) {
        return (command) => {
            return Bluebird.using(this._getMysqlConnection()(), (connection) => {
                return connection.queryAsync(command);
            });
        }
    };

    /**
     * Middleware for Mysql Query Function
     * @returns {function} that attaches a 'sql' function to request object which runs queries on Mysql
     */
    mysqlBootstrap() {
        return (req, res, next) => {
            req.sql = (() => {
                return this._mysqlQuery()
            })();
            next();
        }
    }

}

module.exports = Database;

/*

Possible usage for transaction if needed

 function withTransaction(fn) {
 return Bluebird.using(pool.acquireConnection(), function(connection) {
 var tx = connection.beginTransaction()
 return Promise
 .try(fn, tx)
 .then(function(res) { return connection.commit().thenReturn(res) },
 function(err) {
 return connection.rollback()
 .catch(function(e) {/ maybe add the rollback error to err }) *_/
.thenThrow(err);
});
});
}

// If the withTransaction block completes successfully, the transaction is automatically committed
// Any error or rejection will automatically roll it back

withTransaction(function(tx) {
    return tx.queryAsync(...).then(function() {
        return tx.queryAsync(...)
    }).then(function() {
        return tx.queryAsync(...)
    });
});

 */