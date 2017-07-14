/** Example for creating a config file*/
const common = {
};

const specific = {
    development: {},
    testing: {},
    staging: {},
    production: {}
};

const config = (ENV) => {
    return Object.assign(specific[ENV], common);
};

module.exports = config;