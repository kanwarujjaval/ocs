const FacultyHelper = require('./facultyHelper');
const ParentHelper = require('./parentHelper');
const StaffHelper = require('./staffHelper');
const StudentHelper = require('./studentHelper');
const AdminHelper = require('./adminHelper');

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
                        let data = await ParentHelper.fetchSessionData(dataWrapper);
                        responseWrapper.parent = data;
                    } else if (dataWrapper.userAuthData.role == 'FACULTY') {
                        let data = await FacultyHelper.fetchSessionData(dataWrapper);
                        responseWrapper.faculty = data;
                    } else if (dataWrapper.userAuthData.role == 'STAFF') {
                        let data = await StaffHelper.fetchSessionData(dataWrapper);
                        responseWrapper.staff = data;
                    } else if (dataWrapper.userAuthData.role == 'STUDENT') {
                        let data = await StudentHelper.fetchSessionData(dataWrapper);
                        responseWrapper.student = data;
                    } else if (dataWrapper.userAuthData.role == 'ADMIN') {
                        let data = await AdminHelper.fetchSessionData(dataWrapper);
                        responseWrapper.admin = data;
                    }

                    resolve(PaymentResponse);
                } catch (err) {
                    reject(err);
                }
            })();
        });
    }
}

module.exports = LoginHelper;