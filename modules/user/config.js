class Config {
    constructor() {
        this.LOGIN_TYPES = {
            PHONE_OTP: 1,
            PHONE_PASSWORD: 2,
            EMAIL_PASSWORD: 3,
            ACCESS_TOKEN: 4
        };
    }
}

module.exports = Config;