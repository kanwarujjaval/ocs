/**
 * @typedef {Object} Result
 * @property {Number} status Valid HTTP Status Code
 * @property {String} message Message String
 * @property {Object} data The data object from the handler
*/
/** 
 * The Utility Class <br/>
 * All methods are static
 * */
class Util {
    /**
     * hot require a file by removing cached version
     * @param {String} filePath - Path of file to require.
     * @returns {require} Required File
     */
    static hotRequire (filePath) {
        delete require.cache[require.resolve(filePath)];
        return require(filePath);
    }

    /**
     * Validate http method verbs
     * @param {String} method - Path of file to require.
     * @returns {String} Valid method in lowercase or null
     */
    static validateMethod (method) {
        let _method = method.toLowerCase();
        switch (_method) {
        case 'get':
        case 'post':
        case 'put':
        case 'delete':
            break;
        default:
            _method = null;
        }
        return _method;
    }

    /**
     * @todo Detailing
     * @param {Array} parallelTasks Array of {Functions}
     * @returns {Promise} Deferred Promise of all parallel tasks
     */
    static runTasksInParallel (parallelTasks) {
        return new Promise((resolve, reject) => {
            Promise.all(parallelTasks.map((task) => {
                return task();
            }))
                .then((result) => {
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                });
        });
    }

    /**
     * Basic Error Handler
     * @todo Add cases
     * @param {Error} e Instace of Error
     * @returns {Result} The standard Result Object
     */
    static errorHandler (e) {
        let status = 500;
        let message = 'Internal Server Error';
        let data = {};

        if (e.message) {
            // error has message
            message = e.message; // or any operation on message
        } else if (e.errCode) {
            // mongo error
            if (e.errCode === 1) { e.message = '1 error'; }
        }

        // run reporters?
        return {
            status: status,
            message: message,
            data: data
        };
    }

    /**
     * Basic Success response function
     * @param data Data to be sent in the Data Key
     * @returns {Result} The standard Result Object
     */
    static successHandler (data) {
        let status = 200;
        let message = 'Success';
        return {
            status: status,
            message: message,
            data: data
        };
    }

    /**
     * TODO Documentation
     * @param e
     */
    // static silentErrorHandler (e) {
    // TODO Documentation
    // }
}

module.exports = Util;
