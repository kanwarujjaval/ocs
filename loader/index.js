const fs = require('fs');
const Util = require('./../utils');
const MODULE_DIR = './modules/';
const API_PREFIX = '';

/**
 * Loader class for module management <br/>
 * Loads/removes all modules within the modules directory and adds all routes to the express router <br/>
 * */
class Loader {
    /**
     * create a new loader object
     * @param {Express} app - The express instance.
     * @param {Auth} auth - Instance of the auth class.
     * @param {load | add | delete } action @default load <br/>
     * <b>load</b> - Load All Modules <br/>
     * <b>add</b> - Add a single module <br/>
     * <b>delete</b> - Delete a single Module <br/>
     * @param {String} moduleName - Name of the module to Add/Delete.
     * @default null
     */
    constructor(app, auth, action = 'load', moduleName = null) {
        switch (action.toLowerCase()) {
        case 'load':
            this._init = true;
            this._add = false;
            this._delete = false;
            break;
        case 'add':
            this._init = false;
            this._add = false;
            this._delete = false;
            break;
        case 'delete':
            this._init = false;
            this._add = false;
            this._delete = false;
            break;
        default:
            throw new Error('Invalid Initialization');
        }
        if (!this._init && !moduleName) {
            throw new Error('Invalid initialization');
        }
        this.app = app;
        this._auth = auth;
        this.moduleName = moduleName;
        this.modules = [];
    }

    /**
     * prefix module name to each api path
     * @param {Array} Array of module paths
     * @param {String} Parent Module Name
     * @private
     */
    _fixPath(module, moduleName) {
        module = module.forEach((api) => {
            api.path = '/' + moduleName + api.path;
        });
        return module;
    }

    /**
     * Load all modules to app
     * @private
     */
    _populateModules() {
        let moduleDirs = fs.readdirSync(MODULE_DIR);
        moduleDirs.forEach((module) => {
            let curModule = require('./../modules/' + module);
            this._fixPath(curModule, module);
            this.modules.push(curModule);
        });
        this._loadModules();
    }

    /**
     * Load single module to app
     * @private
     */
    _addModule() {
        let curModule = require('./../modules/' + this.moduleName);
        this.modules.push(curModule);
        this._loadModules();
    }

    /**
     * Remove a single module from app
     * @param {String} moduleName - name of module to remove.
     * @private
     */

    _deleteModule(moduleName) {
        if (!moduleName) { moduleName = this.moduleName; }
        if (!moduleName) { throw new Error('Invalid module removal'); }
        this.app._router.stack = this.app._router.stack.filter((route) => {
            return route.route ? !route.route.path.startsWith('/' + API_PREFIX + moduleName) : true;
        });
    }

    /**
     * actually add modules in this.modules to the app instance
     * @private
     */
    _loadModules() {
        this.modules.forEach((module) => {
            module.forEach((route) => {
                let method = Util.validateMethod(route.method);
                if (!method) return;
                let authMiddelware = (req, res, next) => { return next(); };
                if (route.auth) authMiddelware = this._auth.authenticate;
                this.app[method](route.path, authMiddelware, route.handler);
            });
        });
    }

    /**
     * Apply the instantiated loader config to the running application
     */
    apply() {
        if (this._init) {
            this._populateModules();
        } else {
            this._addModule();
        }
    }
}

module.exports = Loader;
