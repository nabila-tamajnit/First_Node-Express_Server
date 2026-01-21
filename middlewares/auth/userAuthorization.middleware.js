const User = require('../../models/user.model');

// ? Middleware qui va permettre de vérifier si l'id dans la route est le même que l'id rajouté dans la requête par notre authenticationMiddleware

const userAuthorizationMiddleware = () => {

    return async (req, res, next) => {
        //Vérifier si l'id du token stocké dans la requête est identique à l'id dans la route de la requête pour voir si on a le droit d'accéder à la ressource
        // ? 1) Récupérer l'id se trouvant dans la route
        const userRouterId = req.params.id;
        console.log('userRouterId ' + userRouterId);

        // ? 2) Récupérer l'id se trouvant dans le token et qui a été ajouté dans la requête
        const userId = req.user.id;
        console.log('userId ' + userId);

        // ? 3) Récupérer le role de l'utilisateur qui fait la requête puisque s'il est admin, il a tous les droits
        // 2 options :
        // Soit on le récupère dans la requête puisqu'il était dans le token. Inconvénient : Si le rôle de la personne a changé entre le moment où le token a été créé et maintenant, il a toujours l'ancienne rôle
        // Soit on fait une requête vers la DB pour avoir son rôle à cet instant précis ☝🏻 On va faire elle
        try {

            const tokenUser = await User.findById(userId);
            // Si on n'a pas récupéré d'utilisateur c'est que la personne qui fait la requête a été supprimée de la db entre temps
            if(!tokenUser) {

                res.status(404).json({ statusCode : 404, message : 'Vous n\'existez plus, dommage'})

            } else {
                // ? Si par contre la personne existe, on va vérifier son rôle :
                // S'il est admin, c'est bon, il a accès
                if(tokenUser.role === 'Admin'){
                    next();

                } 
                // Sinon, si les deux id sont les même, ce sont ses tâches, donc c'est bon
                else if(userId === userRouterId){
                    next();
                } 
                // Sinon, c'est qu'il n'est ni Admin, ni la personne dont il souhaite regarder les tâches
                else {
                    res.status(403).json({ statusCode : 403, message : 'Vous n\'avez pas les droits d\'accéder à ces données !' })
                }
            }


        }catch(err){
            res.status(500).json({ statusCode : 500, message : 'Une erreur est survenue dans la db' })
        }

        
        

    }
}

module.exports = userAuthorizationMiddleware;