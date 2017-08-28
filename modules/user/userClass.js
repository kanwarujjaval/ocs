const Util = require('./../../utils');
const UserModel = require('./userModel');
const LoginHelper = require('./helper/loginHelper');
const UserConfig = new (require('./config'))();

/**
 *  User module class 
 * */
class User {
    /**
     * User signup end point
     * 
     * @param {Object} req
     * @param {Object} res
     * @returns {response}
     */
    async signUp(req, res) {
        try {
            let data = req.body;

            let result = await new UserModel(data).save();

            /*
                TODO - 
            
                1. USER VERIFICATION FLAG DEFAULTS TO ZERO AND AFTER PHONE VERIFICATION OR EMAIL VERIFICATION,
                CHANGE THE FLAG TO 1.

                2. SEND OTP / EMAIL TO THE USER 
                     
            */
            let response = {
                userData: result
            };

            result = Util.successHandler(response);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }

    /**
     * User login end point
     * 
     * @param {Object} req
     * @param {Object} res
     * @returns {response}
     */
    async login(req, res) {
        try {

            let dataWrapper = {
                body: req.body,
                userAuthData: req.authData
            };

            if (dataWrapper.body.loginType == UserConfig.LOGIN_TYPES.PHONE_OTP) {
                await LoginHelper.VerifyUserUsingOtp(dataWrapper);
            } else if (dataWrapper.body.loginType == UserConfig.LOGIN_TYPES.PHONE_PASSWORD) {
                await LoginHelper.VerifyUserUsingPasswordAndPhone(dataWrapper);
            } else if (dataWrapper.body.loginType == UserConfig.LOGIN_TYPES.EMAIL_PASSWORD) {
                await LoginHelper.VerifyUserUsingPasswordAndEmail(dataWrapper);
            } else if (dataWrapper.body.loginType == UserConfig.LOGIN_TYPES.ACCESS_TOKEN) {
                await LoginHelper.VerifyUserUsingAccessToken(dataWrapper);
            } else {
                throw (new Error('Login type not defined'));
            }

            let result = await LoginHelper.LoginTheUser(dataWrapper);

            let response = {
                userData: result
            };

            result = Util.successHandler(response);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }

    /**
     * GET user end point
     * 
     * @param {Object} req
     * @param {Object} res
     * @returns {response}
     */
    async getUser(req, res) {
        try {
            let data = req.query;

            let result = await UserModel.find({}).limit(data.limit).skip(data.skip);

            result = Util.successHandler(result);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }

    /**
     * Update user end point
     * 
     * @param {Object} req 
     * @param {Object} res 
     * @returns {response}
     */
    async updateUser(req, res) {
        try {
            let data = req.body;
            let criteria = { _id: req.body.id };
            let result = null;
            UserModel.update(criteria, data);

            result = Util.successHandler(result);
            return res.status(result.status).send(result);
        } catch (e) {
            let result = Util.errorHandler(e);
            return res.status(result.status).send(result);
        }
    }
}

module.exports = User;
