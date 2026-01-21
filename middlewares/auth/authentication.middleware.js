const { Request } = require('express');
const jwtUtils = require('../../utils/jwt.utils');
// ? Ce middleware va permettre de vérifier si un token a bien été fourni
// Si oui, on continue la requête
// Si pas de token, on arrête la requête et on met un code d'erreur
// -> Résulat : Il faut être connecté pour accéder à la ressource

const authenticationMiddleware = () => {

    /**
     * @param { Request } req
     */
    return async (req, res, next) => {
        // Le token reçu dans authorization doit ressembler à
        // "Bearer LeTokenIciAvecPleinDeChiffresEtDeLettres"
        // ? Récupérer le headers qui s'appelle authorization
        const authorization = req.headers.authorization;

        // ? Si le token n'a pas été ajouté dans authorization, on aura undefined et dans ce cas, on met fin à la requête : la personne n'est pas connectée
        if (!authorization) {
            res.status(401).json({ statusCode: 401, message: 'Vous devez être connecté' });
        }
        else {

            // ? Si quelqu'un a envoyé quelque chose dans Authorization comme "Bearer " sans envoyer le token après Bearer : fin de la requête
            // authorization.split(' ') permet de découper la chaine, là où il y a un espace
            // On obtient donc un tableau avec 2 cases :
            // Dans la première [0] "Bearer" 
            // Dans la deuxième [1] le token
            const token = authorization.split(' ')[1];
            if (!token) {
                res.status(401).json({ statusCode: 401, message: 'Vous devez être connecté' });
            }

            // ? Si y'a un token
            // On essaie de le décoder
            try {
                const payload = await jwtUtils.decode(token);

                // On va stocker le payload récupéré dans notre objet req comme ça, on peut savoir à tout moment dans la suite de la requête, qui est l'utilisateur actuellement demandeur de la requête
                // Pour ajouter une info dans la requête, je prends juste l'objet req et je lui ajoute une nouvelle propriété à l'arrache (c'est la magie du JS). (Attention juste à ne pas mettre un nom déjà utilisé comme query, body, url etc)
                req.user = payload;

                // On continue la requête
                next();
            }
            catch (err) {

                // Si erreur, le décodage a planté, le token n'est plus bon ou erroné, donc fin de la requête

                res.status(401).json({ statusCode: 401, message: 'Vous devez être connecté' });
            }
        }


    }
}

module.exports = authenticationMiddleware;