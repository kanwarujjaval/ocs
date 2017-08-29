const UserModel = require('../userModel');
const SessionHelper = require('../../session/helper/sessionData');

class LoginHelper {
    static VerifyUserUsingOtp(data) {
        /* 
            TODO - 
            VERIFY USER OTP HERE
        */
    }

    static VerifyUserUsingPasswordAndPhone(data) {
        /* 
            TODO - 
            VERIFY USER PHONE NO AND PASSWORD 
        */
    }

    static VerifyUserUsingPasswordAndEmail(data) {
        /* 
            TODO - 
            VERIFY USER EMAIL AND PASSWORD
        */
    }

    static VerifyUserUsingAccessToken(data) {
        /* 
            TODO - 
            VERIFY USER USING ACCESS TOKEN 
            THE USER HERE WILL BE ALREADY VERIFIED BY THE AUTH MIDDLEWARE 
        */
    }

    static parentLoginData(dataWrapper) {
        return new Promise((resolve, reject) => {
            (async () => {
                try {

                    /* 
                        TODO -
                        dataWrapper.authUserData._id has to come from auth
                    
                    */
                    let children = await UserModel.find({_id: dataWrapper.authUserData._id});
                    let childrenData = await UserModel.find({_id : {$in : children[0].parentData.childern}});

                    /* Send only the children data to the app, there will be serapate api to fetch session data */

                    resolve(childrenData);
                } catch (err) {
                    reject(err);
                }
            })();
        });
    }

    static facultyLoginData(dataWrapper) {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    
                    let data = await SessionHelper.fetchFacultySessionData(dataWrapper);
                    
                    resolve(data);
                } catch (err) {
                    reject(err);
                }
            })();
        });
    }

    static LoginTheUser(dataWrapper) {
        return new Promise((resolve, reject) => {
            (async () => {
                try {

                    /* 
                        TODO - 
                        GENERATE USER TOKEN AND SEND IT AS RESPONSE ALONG WITH OTHER DATA
                        i18n WILL BE EMPLOYED HERE AND DISPLAY TEXT WILL BE DECIDED
                    */
                    let responseWrapper = {
                        parent: {},
                        faculty: {},
                        staff: {},
                        student: {},
                        admin: {}
                    };

                    if (dataWrapper.userAuthData.role == 'PARENT') {
                        let data = await this.parentLoginData(dataWrapper);
                        responseWrapper.parent = data;
                    } else if (dataWrapper.userAuthData.role == 'FACULTY') {
                        let data = await this.facultyLoginData(dataWrapper);
                        responseWrapper.faculty = data;
                    } else if (dataWrapper.userAuthData.role == 'STAFF') {
                        /* Staff login data */
                    } else if (dataWrapper.userAuthData.role == 'STUDENT') {
                        /* Student login data */
                    } else if (dataWrapper.userAuthData.role == 'ADMIN') {
                        /* Admin login data */
                    }

                    resolve(responseWrapper);
                } catch (err) {
                    reject(err);
                }
            })();
        });
    }
}

module.exports = LoginHelper;