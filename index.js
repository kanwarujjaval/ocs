const Express = require('express');
const Loader  = require('./loader');
const Config  = require('./config');
const Db      = require('./db');

const ENV     = process.env.NODE_ENV || "development";

const app     = new Express();
const loader  = new Loader(app, true, null);
const config  = new Config(ENV);
const db      = new Db(config);

(async () => {
    let port = config.SERVER.PORT;
    await app.listen(port);
    app.use(db.mysqlBootstrap());
    loader.apply();
    console.info('OCS Server started on port', port);

    //_start demonstration for the loader class
    // setTimeout(() => {
    //     loader.deleteModule('sample');
    //     setTimeout(() => {
    //         loader.apply()
    //     }, 4000)
    // }, 4000)
    //_end demonstration for loader module

})();
