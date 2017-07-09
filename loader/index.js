const fs = require('fs');
let MODULE_DIR = './../modules/';

class Loader {

    constructor(app, init = false) {
        this._init = init;
        this.app = app;
        this.modules = [];
    }

    static hotReload(filePath) {
        delete require.cache[require.resolve(filePath)];
        return require(filePath);
    }

    populateModules() {
        let moduleDirs = fs.readdirSync(MODULE_DIR);
        moduleDirs.forEach((module) => {
            let curModule = require(MODULE_DIR + module);
            this.modules.push(curModule);
        });
    }

    addModule() {
        //add module and apply
    }

    deleteModule() {
        //delete module and apply
    }

    apply() {
        if(this._init)
            this.populateModules();
        this.modules.forEach((module) => {

        })
    }

}

module.exports = Loader;