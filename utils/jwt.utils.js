const jwt = require('jsonwebtoken');

const { JWT_ISSUER, JWT_AUDIENCE, JWT_SECRET } = process.env;

const jwtUtils = {

    generate : (user) => {

        return new Promise( (resolve, reject) => {

            const playload = {
                id : user._id,
                role : user.role
            }

            const options = {
                algorithm : 'HS512',
                expiresIn : '3d',
                audience : 'JWT_AUDIENCE',
                issuer : 'JWT_ISSUER'
            }

            jwt.sign(playload, JWT_SECRET, options, (error, token) => {

                if(error){
                    reject(error);
                }

                resolve(token);
            })
        })
    },

    decode : (token) => {

    }
}

module.exports = jwtUtils;