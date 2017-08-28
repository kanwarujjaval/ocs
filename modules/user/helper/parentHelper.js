const UserModel = require('../userModel');

class ParentHelper {
    static fetchSessionData(dataWrapper){
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
}

module.exports = ParentHelper;