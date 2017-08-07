const Express = require('express');
const Loader = require('./loader');
const Config = require('./config');
const bodyParser = require('body-parser');
const Auth = require('./auth');

const ENV = process.env.NODE_ENV || 'development';

const app = new Express();
const loader = new Loader(app, true, null);
const config = new Config(ENV);
const auth = new Auth(config);

(async () => {
    /* middlewares */ 
    app.use(require('morgan')('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    let port = config.SERVER.PORT;
    await app.listen(port);
    loader.apply(auth);
    console.info('OCS Server started on port', port);

    // app.use(mysql.bootstrap());  //adds req.mysql
    // _start demonstration for the loader class
    // setTimeout(() => {
    //     loader.deleteModule('sample');
    //     setTimeout(() => {
    //         loader.apply()
    //     }, 4000)
    // }, 4000)
    // _end demonstration for loader module
})();
