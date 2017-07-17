const organisationModel = require('./organisationModel');
const userModel         = require('../user/userModel')

let organisation = new organisationModel();
let user         = new userModel();

/** Organisation module class */
class Organisation {

    /**
     * handle POST Organisation request
     * @param {Object} req express request object
     * @param {Object} res express response object
     * @return {Function} response function call
     * */
    async postOrganisation(req, res){
        console.log(req.body.email);
        let name    = req.body.name;
        let email   = req.body.email;
        let phoneNo = req.body.phoneNo;
        let address = req.body.address;
        let role    = ['admin'];

        organisation.name    = name,
        organisation.email   = email,
        organisation.phoneNo = phoneNo,
        organisation.address = address,
        organisation.role    = role

        user.name    = name,
        user.email   = email,
        user.phoneNo = phoneNo,
        user.role    = role

        await organisation.save();
        await user.save();

        return res.send("Registered successfully.");
    }
}

module.exports = Organisation;