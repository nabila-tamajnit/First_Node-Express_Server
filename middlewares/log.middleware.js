const { Request, Response } = require("express");

const logMiddleware = () => {
    
    /**
     * @param {Request} req
     * @param {Response} res
     */
    //Un middleware est une fonction, qui va renvoyer la requête
    return (req, res, next) => { 
        //req contient la requête entrante où on ira chercher les infos qui nous intéressent
        //res contient la réponse et nous permettra de stopper la requête s'il le faut
        //next est une fonction qu'on exécutera pour permettre à la requête de continuer
        const method = req.method;
        const url = req.url;
        const date = new Date();

        console.log(`${method}  ${url}  ${date.toLocaleDateString()}  ${date.toLocaleTimeString()}`); 
        
        next(); 
        // l'exécution/l'appel de la fonction next, permettra d'indiquer que la requête continue son chemin
    }
}

module.exports = logMiddleware;