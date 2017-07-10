const express = require('express');
const Loader = require('./loader');

const app = new express();
let loader = new Loader(app, true, null);

(async () => {
    await app.listen(3000);
    loader.apply();
    console.info('OCS Server started on port 3000');

    //_start demonstration for the loader class
    setTimeout(() => {
        loader.deleteModule('sample');
        setTimeout(() => {
            loader.apply()
        }, 4000)
    }, 4000)
    //_end demonstration for loader module

})();
