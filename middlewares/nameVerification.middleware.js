const { Request, Response } = require("express");

const nameVerificationMiddleware = () => {

    /**
     * @param {Request} req
     * @param {Response} res
     */
    return (req, res, next) => {
        const name = req.body.name.toLocaleLowerCase();
        let offensiveName = ['boucher', 'macron', 'west', 'trump', 'musk'];

        //pour chaque mot offensant, est-ce que name contient ce mot
        for (let i = 0; i < offensiveName.length; index++) {

            if (name.includes(offensiveName[i])) {
                res.status(400).json({ statusCode: 400, message: 'Ce nom ne peut être validé' });
            } else {
                next();
            }

        }
    }
}

module.exports = nameVerificationMiddleware;