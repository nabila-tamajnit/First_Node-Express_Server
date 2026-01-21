// ! 1) Importer express + Créer le serveur
const express = require('express'); //import de la lib express
const server = express(); //création du serveur express

// ? Récupération des variables d'environnement :
const { PORT, DB_CONNECTION } = process.env;

// ? Pour paramétrer le fait que notre API doit comprendre quand du json arrive
server.use(express.json());

// ---- Utilisation d'un app-middleware qu'on a fait ----
const logMiddleware = require('./middlewares/log.middleware');
server.use(logMiddleware());
// ------------------------------------------------------


// ---- Connection DB ------------------------------
// On va créer un middleware qui établit une connexion à chaque requête
const mongoose = require("mongoose");
server.use( async (req, res, next) => {
    //Pour établir la connexion, nous avons besoin d'importer mongoose (voir plus haut)
    // À partir de cet objet mongoose, nous pouvons créer une connexion. La connexion peut prendre du temps, peut échouer donc la méthode pour se connecter nous renvoie une Promise. Il faut donc soit utiliser .then.catch soir le async await avec le try catch (plus propre)
    try {

        // on va essayer de se connecter
        await mongoose.connect(DB_CONNECTION, { dbName : 'TaskManager' });
        console.log("💾 Successfully connected to the DB !");

        next(); //si on a réussi à se connecter à la DB, on continue la requête

    } catch(err){

        // si la connexion échoue, on va écrire le message d'erreur dans la console
        console.log(`❌ Connection Failed \n[Reason]\n ${err}`);

        res.status(500).json( { statusCode : 500 , message : 'Impossible de se connecter à la base de données'  } );
    
    }
})
// -------------------------------------------------


// ! 2) Traiter les requêtes
// indiquer à notre app que le routing se trouve dans le dossier 📁 routes
const router = require('./routes'); //import de l'objet routeur présent dans index.js
server.use('/api', router); //indiquer à notre server qu'il doit utiliser le router



// ! 3) Écouter le serveur sur un port spécifique
server.listen(PORT, () => {
    console.log(`🚀 Express Server started on port ${ PORT }`);
})