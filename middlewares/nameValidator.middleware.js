const offensivesWords = [ "trump", "elon" , "macron", "vladimir poutine" ]

const nameValidatorMiddleware = () => {
    return (req, res, next) => {

        /* Si jamais par mégarde on a mis notre middleware sur une route pù y'a pas de body, on continue la requête */
        if(!req.body){
            next();
        }

        /* Si jamais par mégarde on a mis notre middleware sur une requête où le body ne contient pas de propriété qui s'appelle name */
        if(!req.body.name) {
            next();
        }

        const name = req.body.name.toLowerCase();
        // Vérifier que pour chaque mot contenu dans la liste de mot offensants, qu'il n'est pas présent dans le name qu'on a récupéré
        // for(let word of offensivesWords){
        //     //Si le name inclut le mot , on met fin à la requête
        //     if(name.includes(word)) {
        //         res.status(400).json({ statusCode : 400, message : 'Ca va pas bien ?!?'});
        //     }
            
        // }
        //ou alors avec le some

        if(offensivesWords.some(word => name.includes(word))){
            res.status(400).json({ statusCode : 400, message : 'Ca va pas bien ?!?'});
        }
        //Si on sort de la boucle c'est que notre requête n'a pas pris fin donc pas de mot offensant, alors on continue
        next();

    }
}

module.exports = nameValidatorMiddleware;