const argon2 = require('argon2');
const User = require('../../models/user.model');

const authService = {

    findByCredentials : async(credentials) => {
        try {

            //Trouver l'utilisateur dont le mail est égal à celui reçu, si pas d'utilisateur trouvé, on sort
            const userFound = await User.findOne({ email : credentials.email });

            if(!userFound){
                return undefined;
            }

            //Si utilisateur trouvé, on va vérifier si le pwd qu'il a entré correspond à celui hashé dans la db
            const checkPassword = await argon2.verify(userFound.password, credentials.password);
            // Si pas, on sort
            if(!checkPassword) {
                return undefined;
            }
            else {
                // Si oui, c'est qu'on a le bon mail et le bon pwd, donc on peut renvoie l'utilisateur
                return userFound;
            }

        }catch(err){
            console.log(err);
            throw new Error(err);
        }
    },

    emailAlreadyExists : async(email) => {
        try {

            const userFound = await User.findOne( { email });
            //Si un utilisateur est trouvé, oui, l'email existe déjà
            if(userFound) {
                return true;
            }
            else { 
                //sinon non
                return false;
            }

        }catch(err){
            console.log(err);
            throw new Error(err);
        }
    },

    create : async(user) => { 
        try {
            // ? On va hasher et modifier le mot de passe de l'utilisateur pour ajouter la version hashée en db
            const hashedPassword = await argon2.hash(user.password);

            // On remplace le password du user avec la version hashée
            user.password = hashedPassword;

            // Plus qu'à sauvegarder notre user
            const userToCreate = User(user);
            await userToCreate.save();
            
            return userToCreate;


        }catch(err){
            console.log(err);
            throw new Error(err);  
        }


    }



}

module.exports = authService;