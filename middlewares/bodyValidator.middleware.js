const { Request, Response } = require("express");

let offensivesWords = ['boucher', 'macron', 'west', 'trump', 'musk'];

const bodyValidatorMiddleware = () => {

    /**
     * @param {Request} req
     * @param {Response} res
     */
    return (req, res, next) => {

        if (!req.body) {
            next();
        }

        const fields = Object.keys(req.body);

        for (let field of fields) {

            const valueInField = req.body[field];

            if (typeof valueInField === 'string') {

                if (offensivesWords.some(word => valueInField.toLocaleLowerCase().includes(word))) {
                    res.status(400).json({ statusCode: 400, message: `Vous ne pouvez pas mettre n'importe quoi dans ${field}` });
                    return;
                }
            }
        }
        next();
    }
}

module.exports = bodyValidatorMiddleware;