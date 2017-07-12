module.exports = (ENV) => {
    return {
        DB          : require('./db')[ENV],
    }
};
