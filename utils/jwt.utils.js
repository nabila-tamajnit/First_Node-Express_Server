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
                audience : JWT_AUDIENCE,
                issuer : JWT_ISSUER
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
        return new Promise((resolve, reject) => {
            // ? 1) Si rien dans paramètre token, promesse non tenue
            if(!token) {
                reject(new error('Pas de token reçu'));
            }

            // ? 2) Si y a bien un token, on peut  s'occuper de le décoder
            // pour ça on va faire appel à la methode verify qui prend plusieurs paramètres :
            // la 1ere c'est le token à décoder
            // La 2eme c'est le secret
            // La 3eme ce sont les options
            // La 4eme c'est la fonction qui sera lancée à la fin de la vérification avec comme paramètre erreur et playload
            const options = {
                audience : JWT_AUDIENCE,
                issuer : JWT_ISSUER
            }
            
            jwt.verify(token, JWT_SECRET, options, (error, playload) => {
                // Si une erreur est survenue pdt le décodage error est rempli mais pas playload
                if(error) {
                    reject(error);
                }

                // Si pas d'erreur pdt de décodage, error est vide et playload est rempli avec les claims qu'on avait mis dans le token
                resolve(playload);

            })
        })

    }
}

module.exports = jwtUtils;