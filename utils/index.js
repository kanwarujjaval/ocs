/** the util class */
class Util {

    /**
     * hot require a file by removing cached version
     * @param {String} filePath - Path of file to require.
     * @static
     */
    static hotRequire(filePath) {
        delete require.cache[require.resolve(filePath)];
        return require(filePath);
    }

    /**
     * Validate http method verbs
     * @param {String} method - Path of file to require.
     * @return {String} valid method in lowercase or null
     * @static
     */
    static validateMethod(method) {
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
        return _method
    }

    static runTasksInParallel(parallelTasks) {
        return new Promise((resolve, reject) => {
            Promise.all(parallelTasks.map((task) => { return task(); })).then((result) => {
                return resolve(result);
            }).catch ((error) => {
                console.log(error.message);
                return reject(error);
            })
        })
    }

    static errorHandler(e) {
        let status = 500;
        let message = "Internal Server Error";
        let data = {};

        if (e.message) {
            //error has message
            message = e.message; //or any operation on message
        } else if (err.errCode) {
            //mongo error
            if (e.errCode == 1)
                e.message = '1 error'
        }

        //run reporters?

        let response = {
            status: status,
            message: message,
            data: data
        };
        return response;
    }

    static successHandler(data) {
        let status = 200;
        let message = "Success";
        let response = {
            status: status,
            message: message,
            data: data
        };
        return response;
    }
}

module.exports = Util;