const authService = require("../services/mongo/auth.service");


const authController = {

    register: async (req, res) => {

        try {

            //On récupère le body de la requête qui contient les infos de l'utilisateur
            const userToAdd = req.body;

            // On va vérifier si l'email n'est pas déjà utilisé
            if(await authService.emailAlreadyExists(userToAdd.email)){

                res.status(409).json({ statusCode : 409, message : 'Cet email est déjà utilisé' });

            }

            //On tente de d'ajouter l'utilisateur
            const userCreated = await authService.create(userToAdd);

            res.location(`/api/user/${userCreated._id}`);
            
            res.status(201).json({
                id: userCreated._id,
                firstname: userCreated.firstname,
                lastname: userCreated.lastname
            });

        }
        catch (err) {
            res.sendStatus(500);
        }
    },

    login: async (req, res) => {

        try {
            // récupérer les infos de connexion envoyées dans le body
            const credentials = req.body;

            // essayer de trouver l'utilisateur qui correspond à ces données
            const userFound = await authService.findByCredentials(credentials);

            // Si pas d'utilisateur trouvé, les infos de connexion ne sont pas bonnes
            if(!userFound) {
                res.status(401).json({ statusCode : 401, message : 'Les informations de connexion ne sont pas bonnes' });
            }
            else {
                res.status(200).json( { 
                    id : userFound._id, 
                    firstname : userFound.firstname, 
                    lastname : userFound.lastname 
                } )
            }

        }catch(err){
            console.log(err);
            res.sendStatus(500);
            
        }
    }
}

module.exports = authController;