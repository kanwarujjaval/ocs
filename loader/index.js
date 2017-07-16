const fs = require('fs');
const Util = require('./../utils');
let MODULE_DIR = './modules/';
let API_PREFIX = '';

/** Loader class for module management */
class Loader {

    /**
     * create a new loader
     * @param {Object} app - The express instance.
     * @param {Boolean} init - initialize all modules?.
     * @param {String} moduleName - Single module to load if init = false.
     */

    constructor(app, init, moduleName) {
        if (!init && !moduleName)
            throw new Error('Invalid initialization');
        this._init = init;
        if (moduleName && typeof moduleName === typeof 'a')
            this._init = false;
        this.app = app;
        this.moduleName = moduleName;
        this.modules = [];
    }

    /**
     * prefix module name to each api path
     */
    _fixPath(module, moduleName){
        module = module.forEach((api)=>{
            api.path = '/' + moduleName + api.path;
        });
        return module;
    }

    /**
     * Load all modules to app
     */
    populateModules() {
        let moduleDirs = fs.readdirSync(MODULE_DIR);
        moduleDirs.forEach((module) => {
            let curModule = require('./../modules/' + module);
            this._fixPath(curModule, module);
            this.modules.push(curModule);
        });
        this.loadModules();
    }

    /**
     * Load single module to app
     */
    addModule() {
        let curModule = require('./../modules/' + this.moduleName);
        this.modules.push(curModule);
        this.loadModules();
    }

    /**
     * Remove a single module from app
     * @param {String} moduleName - name of module to remove.
     */

    deleteModule(moduleName) {
        if (!moduleName)
            moduleName = this.moduleName;
        if (!moduleName)
            throw new Error('Invalid module removal');
        this.app._router.stack = this.app._router.stack.filter((route) => {
            return route.route ? !route.route.path.startsWith('/' + API_PREFIX + moduleName) : true;
        });
    }

    /**
     * actually add modules in this.modules to the app instance
     */
    loadModules() {
        this.modules.forEach((module) => {
            module.forEach((route) => {
                let method = Util.validateMethod(route.method);
                if (!method)return;
                this.app[method](route.path ,route.handler)
            })
        })
    }

    /**
     * public method to apply the module(s)
     */
    apply() {
        if (this._init)
            this.populateModules();
        else
            this.addModule();
    }

}

module.exports = Loader;