const { Request } = require('express');
// ? Ce middleware va permettre de vérifier si un token a bien été fourni
// Si oui, on continue la requête
// Si pas de token,on arrête la requête et on met un code d'erreur
//  -> Résultat : Il faut être connecté pour accéder à la ressource

const authenticationMiddleware = () => {

    /**
     * @params { Request } req
     */
    return (req, res, next) => {
        // 
        // ? Récupérer le headers qui s'appelle authorization
        const authorization = req.headers.authorization
        console.log(authorization);

        // ? Si le token n'a pas été ajouté dans authorization, on aura undefined et dans ce cas, on met fin à la requête : la prsn n'est pas connecté
        if(!authorization){
            res.status(401).json({ statusCode : 401, messages : 'us devez être connecté'});
        }

        // ? Si qlq1 a envoyé quelque chose dans authorization comme "Bearer" sans envoyer le token après Bearer : fin de la requête
        // authorization.split('') permet de découper la chaine, là où il y a un espace
        //  On obtient donc un tableau avec 2 cases :
        //  Dans la 1ere [0] "Bearer"
        //  Dans la 2eme [1] le token
        const token = authorization.split('')[1];
        if(!token) {
            res.status(401).json({ statusCode : 401, message : 'us devez être connecté' });
        }

        // ? Si y a un token :
        // TODO : décoder le token
        // TODO : stocker le playload récupéré dans notre objet req
        //  On continue la requête
        next();
    }
}

module.exports = authenticationMiddleware;