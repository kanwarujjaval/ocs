const env     = process.env.NODE_ENV || "development";

const express = require('express');
const Loader  = require('./loader');
const Config  = require('./config');

const app     = new express();
let loader    = new Loader(app, true, null);
global.config = new Config(env);

(async () => {
    let port = config.getServerConfig().SERVER.httpPort;
    await app.listen(port);
    loader.apply();
    console.info('OCS Server started on port', port);

    //_start demonstration for the loader class
    setTimeout(() => {
        loader.deleteModule('sample');
        setTimeout(() => {
            loader.apply()
        }, 4000)
    }, 4000)
    //_end demonstration for loader module

})();
