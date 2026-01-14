const { Request, Response } = require("express");

const nameValidatorMiddleware = () => {

    /**
     * @param {Request} req
     * @param {Response} res
     */
    return (req, res, next) => {
        
        let offensivesWords = ['boucher', 'macron', 'west', 'trump', 'musk'];

        if(!req.body) {
            next();
        }

        if(!req.body.name) {
            next();
        }

        const name = req.body.name.toLocaleLowerCase();

        //* Une manière de faire:
        // for(let word of offensivesWords) {
        //     if(name.includes(word)) {
        //         res.status(400).json({ statusCode: 400, message: 'Ce nom ne peut être validé' });
        //     }
        // }
        //next()

        //* Une autre manière de faire:
        // pour chaque mot offensant, est-ce que name contient ce mot
        if (offensivesWords.some(mot => name.includes(mot))) {
            res.status(400).json({ statusCode: 400, message: 'Ce nom ne peut être validé' });
        } else {
            next();
        }
    }
}

module.exports = nameValidatorMiddleware;