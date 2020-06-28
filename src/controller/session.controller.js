const helper = require('../helpers/helper');
const User = require('../model/user.model');
const sessionHelper = require('../helpers/session.helper');

/**
 * User Login
 * 
 * @param {*} req 
 * @param {*} res 
 */
const login = async (req, res) => {
    try {
        const basicAuth = req.headers.authorization;

        const authCredentials = helper.getCredentials(basicAuth);
        if (!authCredentials) {
            return res.status(401).send({status: 'failure', errors: 'Performing this action on this resource requires authorization'});
        }
        
        const [id, password] = authCredentials;

        let userData = await User.findOne({
            email_address: id
        });

        // Check for employee code
        if (!userData) {            
            return res.status(454).send({status: 'failure', errors: 'The server failed to load the session'});
        }

        const isPasswordValid = helper.isPasswordValid(password, userData.password);
        if (!isPasswordValid) {
            return res.status(403).send({status: 'failure', errors: 'You do not have permissions to perform this action on this resource'});
        }

        const result = await sessionHelper.saveSession(userData);
        return res.status(200).send({status: 'success', data: result});
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    login
}