 const { Request, Response } = require("express");
 
 const idValidatorMiddleware = () => {

        /**
     * @param {Request} req
     * @param {Response} res
     */
    return (req, res, next) => {
        const id = req.params.id;

        if(isNaN(id)){
            res.status(400).json({
                statusCode : 400,
                message : 'L\'id doit être un nombre entier'
            });
        }
        else {
            next();
        }
    }
 }

 module.exports = idValidatorMiddleware;