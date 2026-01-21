const User = require("../../models/user.model");

const roleAuthorizationMiddleware = (roles) => {

    return async (req, res, next) => {
        const userId = req.user.id;

        try {
            const userInDB = await User.findById(userId);

            if(!userInDB) {
                res.status(404).json({ statusCode : 404, message : 'Vous n\'existez plus en DB, dommage' })
            }
            else {
                if(roles.includes(userInDB.role)) {
                    next()
                }
                else {
                    res.status(403).json({ statusCode : 403, message : 'Vous n\'avez pas les droits d\'accès sur cette ressource '})
                }
            }
        }
        catch(err) {
            console.log(err);
            res.status(500).json({ statusCode : 500, message : 'La DB a planté'})
            
        }
    }
}

module.exports = roleAuthorizationMiddleware;