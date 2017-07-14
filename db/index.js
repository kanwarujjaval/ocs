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

    _getMysqlConnection() {
        return ()=> {
            return this._mysqlPool()().getConnectionAsync().disposer((connection) => {
                return connection.release();
            });
        }
    };

    _mysqlQuery(command) {
        return (command) => {
            return Bluebird.using(this._getMysqlConnection()(), (connection) => {
                return connection.queryAsync(command);
            });
        }
    };

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