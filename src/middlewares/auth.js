const Session = require('../model/session.model');

module.exports = async (req, res, next) => {

    const token = req.header('SESSION-ID');
    if (!token) {
        return res.status(401).send({status: 'failure', errors: 'Performing this action on this resource requires authorization'});
    }

    const session = await Session.findOne({
        token: token.trim()
    });

    if (!session) {
        return res.status(401).send({status: 'failure', errors: 'Performing this action on this resource requires authorization'});
    }

    req.user_id = session.user_id;
    req.token = session.token;
    next();
};