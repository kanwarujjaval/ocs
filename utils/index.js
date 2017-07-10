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
}

module.exports = Util;